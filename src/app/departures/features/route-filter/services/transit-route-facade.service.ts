import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TransitRouteDirectionsService} from 'src/app/core/services/transit-routes/route-directions.service';
import {TransitRouteDeparturesService} from 'src/app/core/services/transit-routes/transit-departures.service';
import {TransitRouteStopsService} from 'src/app/core/services/transit-routes/transit-stops.service';
import {memoizeRxJs} from 'src/app/core/util';
import {NexTripRoute} from 'src/app/departures/models/route';
import {
  NexTripDeparture,
  NexTripDepartureAggregate,
  NexTripGPSLocation,
} from 'src/app/departures/models/route-departure';
import {NexTripRouteDirection} from 'src/app/departures/models/route-direction';
import {NexTripRouteLocation} from 'src/app/departures/models/route-location';
import {TransitRoutesService} from '../../../../core/services/transit-routes';

@Injectable({
  providedIn: 'root',
})
export class TransitRouteFacade {
  getActiveRoutes: () => Observable<NexTripRoute[]>;
  getRouteDirections: (routeId: string) => Observable<NexTripRouteDirection[]>;
  getRouteStops: (
    routeId: string,
    directionId: number
  ) => Observable<NexTripRouteLocation[]>;
  getRouteDepartures: (
    routeId: string,
    directionId: number,
    placeCode: string
  ) => Observable<NexTripDepartureAggregate>;

  // getRouteDirections: () => Observable
  constructor(
    private _transitRouteService: TransitRoutesService,
    private _routeDirectionsService: TransitRouteDirectionsService,
    private _routeStopsService: TransitRouteStopsService,
    private _routeDeparturesService: TransitRouteDeparturesService
  ) {
    this.getActiveRoutes = memoizeRxJs<NexTripRoute[]>(
      this._getActiveRoutes.bind(this)
    );

    this.getRouteDirections = memoizeRxJs<NexTripRouteDirection[]>(
      this._getRouteDirections.bind(this)
    );

    this.getRouteStops = memoizeRxJs(this._getRouteStops.bind(this));
    this.getRouteDepartures = memoizeRxJs(
      this._getRouteStopDepartures.bind(this)
    );
  }

  private _getActiveRoutes(): Observable<NexTripRoute[]> {
    return this._transitRouteService.getActiveRoutes().pipe(
      map(routes => {
        return routes.map(
          route =>
            new NexTripRoute(
              {
                label: route.route_label,
                agencyId: route.agency_id,
              },
              route.route_id
            )
        );
      })
    );
  }

  private _getRouteDirections(
    routeId: string
  ): Observable<NexTripRouteDirection[]> {
    return this._routeDirectionsService.getRouteDirections(routeId).pipe(
      map(directions => {
        return directions.map(dir =>
          NexTripRouteDirection.create(
            {
              routeId,
              name: dir.direction_name,
            },
            dir.direction_id
          )
        );
      })
    );
  }

  private _getRouteStops(
    routeId: string,
    directionId: number
  ): Observable<NexTripRouteLocation[]> {
    return this._routeStopsService.getRouteStops(routeId, directionId).pipe(
      map(locations => {
        return locations.map(loc =>
          NexTripRouteLocation.create(
            {
              description: loc.description,
              directionId,
            },
            loc.place_code
          )
        );
      })
    );
  }

  private _getRouteStopDepartures(
    routeId: string,
    directionId: number,
    placeCode: string
  ): Observable<NexTripDepartureAggregate> {
    return this._routeDeparturesService
      .getRouteDepartures(routeId, directionId, placeCode)
      .pipe(
        map(response => {
          const stops = response.stops.map(s =>
            NexTripGPSLocation.create(
              {
                latitude: s.latitude,
                longitude: s.longitude,
                description: s.description,
              },
              s.stop_id
            )
          );

          const departures = response.departures.map(d =>
            NexTripDeparture.create({
              isRealTime: d.actual,
              destinationDescription: d.description,
              shortName: d.route_short_name,
              gate: d.gate,
              departureTime: new Date(d.departure_time),
            })
          );

          return new NexTripDepartureAggregate(
            stops,
            departures,
            routeId,
            directionId,
            placeCode
          );
        })
      );
  }
}
