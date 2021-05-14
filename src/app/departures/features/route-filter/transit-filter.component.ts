import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, interval, Subscription, timer, zip} from 'rxjs';
import {Observable, of} from 'rxjs';
import {switchMap, map, tap, filter, startWith, take} from 'rxjs/operators';
import {TypeGaurd} from 'src/app/core/util';
import {NexTripRoute} from '../../models/route';
import {NexTripDepartureAggregate} from '../../models/route-departure';
import {NexTripRouteDirection} from '../../models/route-direction';
import {NexTripRouteLocation} from '../../models/route-location';
import {TransitRouteFacade} from './services/transit-route-facade.service';
import {TransitRoute, TransitRouteBuilder} from './transit-route-builder';

const REFRESH_TIME_INTERVAL = 35000;

@Component({
  selector: 'nt-transit-filter',
  templateUrl: './transit-filter.component.html',
  styleUrls: ['./transit-filter.component.scss'],
})
export class TransitFilterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  transitRouteControl = new FormControl();
  routeDirectionControl = new FormControl();
  routeStopLocationControl = new FormControl();

  @ViewChild('noDepartures')
  noDepartures: TemplateRef<any> | null = null;

  routes$: Observable<NexTripRoute[]> = of([]);
  routeDirections$: Observable<NexTripRouteDirection[]> = of();
  routeStopLocations$: Observable<NexTripRouteLocation[]> = of();
  routeDepartures$: Observable<NexTripDepartureAggregate> = of();

  routes: NexTripRoute[] = [];
  directions: NexTripRouteDirection[] = [];
  stopLocations: NexTripRouteLocation[] = [];
  depature: NexTripDepartureAggregate | undefined;

  selectedRoute: NexTripRoute | undefined;
  selectedDirection: NexTripRouteDirection | undefined;
  selectedLocationStop: NexTripRouteLocation | undefined;

  transitRoute?: TransitRoute;
  displayedColumns: string[] = [
    'routeName',
    'isRealTime',
    'destination',
    'departureTime',
  ];

  private _combinedSubscriptions: Subscription | null = null;

  constructor(
    private _transitRoutes: TransitRouteFacade,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.form = new FormGroup({
      transitRouteId: this.transitRouteControl,
      routeDirectionId: this.routeDirectionControl,
      placeCode: this.routeStopLocationControl,
    });
  }

  ngOnInit(): void {
    const timeInterval$ = this._createRefreshTimer();

    const routeBuilder = new TransitRouteBuilder();

    this.fetchAllRoutes();

    const departures$ = this.form.valueChanges.pipe(
      filter(form => {
        const {transitRouteId, routeDirectionId, placeCode} = form;
        return (
          !TypeGaurd.isNullOrUndefined(transitRouteId) &&
          !TypeGaurd.isNullOrUndefined(routeDirectionId) &&
          !TypeGaurd.isNullOrUndefined(placeCode)
        );
      }),
      switchMap(form => {
        const {transitRouteId, routeDirectionId, placeCode} = form;

        const depature = this.fetchRouteDepartures(
          transitRouteId,
          routeDirectionId,
          placeCode
        );

        return depature;
      })
    );

    this._combinedSubscriptions = combineLatest([departures$, timeInterval$])
      .pipe(
        map(([departures, interval]) => {
          const transitRoute = routeBuilder
            .createRoute(this.selectedRoute!)
            .addRouteDirections(this.directions)
            .addRouteLocationStops(
              this.selectedDirection?.directionId!,
              this.stopLocations
            )
            .setRouteLocationStop(this.selectedLocationStop!)
            .addRouteDepartures(this.selectedLocationStop!, departures)
            .build();

          return transitRoute;
        })
      )
      .subscribe(transitRoute => {
        this.transitRoute = transitRoute;
      });

    this.transitRouteControl.valueChanges.subscribe((routeId: string) => {
      if (TypeGaurd.isNullOrUndefined(routeId)) {
        return;
      }
      this._clearRouteDirections();
      this._clearRouteStopLocations();
      this.fetchRouteDirections(routeId);
    });

    this.routeDirectionControl.valueChanges.subscribe(directionId => {
      if (TypeGaurd.isNullOrUndefined(directionId)) {
        return;
      }
      this._clearRouteStopLocations();
      this.fetchRouteStopLocations(directionId);
    });

    this._activatedRoute.queryParams.pipe(take(1)).subscribe(params => {
      const {route_id, direction_id, place_code} = params;
      this.transitRouteControl.setValue(route_id);
      this.routeDirectionControl.setValue(direction_id);
      this.routeStopLocationControl.setValue(place_code);
    });
  }

  ngOnDestroy(): void {
    if (TypeGaurd.isNullOrUndefined(this._combinedSubscriptions)) {
      return;
    }

    this._combinedSubscriptions!.unsubscribe();
  }

  fetchAllRoutes() {
    this.routes$ = this._transitRoutes
      .getActiveRoutes()
      .pipe(tap(routes => (this.routes = routes)));

    return this.routes$;
  }

  fetchRouteDirections(routeId: string) {
    this.routeDirections$ = this._transitRoutes
      .getRouteDirections(routeId)
      .pipe(
        tap(directions => {
          this.selectedRoute = this.routes.find(
            r => r.transitRouteId === routeId
          );
          this.directions = directions;
          this._router.navigate([''], {
            queryParams: {route_id: routeId},
            queryParamsHandling: 'merge',
            relativeTo: this._activatedRoute,
          });
        })
      );

    return this.routeDirections$;
  }

  fetchRouteStopLocations(directionId: number) {
    const selectedRouteId = this.transitRouteControl.value;
    this.routeStopLocations$ = this._transitRoutes
      .getRouteStops(selectedRouteId, directionId)
      .pipe(
        tap(stopLocations => {
          this.selectedDirection = this.directions.find(
            d => d.directionId === directionId
          );
          this.stopLocations = stopLocations;
          this._router.navigate([''], {
            queryParams: {direction_id: directionId},
            queryParamsHandling: 'merge',
          });
        })
      );

    return this.routeStopLocations$;
  }

  fetchRouteDepartures(
    selectedRouteId: string,
    selectedRouteDirectionId: number,
    placeCode: string
  ) {
    this.routeDepartures$ = this._transitRoutes
      .getRouteDepartures(selectedRouteId, selectedRouteDirectionId, placeCode)
      .pipe(
        tap(departure => {
          this.selectedLocationStop = this.stopLocations.find(
            loc => loc.placeCode === placeCode
          );
          this.depature = departure;
          this._router.navigate([''], {
            queryParams: {
              route_id: selectedRouteId,
              direction_id: selectedRouteDirectionId,
              place_code: placeCode,
            },
            queryParamsHandling: 'merge',
          });
        })
      );

    return this.routeDepartures$;
  }

  private _createRefreshTimer(): Observable<number> {
    return interval(REFRESH_TIME_INTERVAL).pipe(startWith(0));
  }

  private _clearRouteDirections(): void {
    this.routeDirectionControl.reset();
  }

  private _clearRouteStopLocations(): void {
    this.routeStopLocationControl.reset();
  }
}
