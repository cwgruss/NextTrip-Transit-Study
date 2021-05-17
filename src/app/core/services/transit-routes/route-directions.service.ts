import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AsyncSubject, Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TransitRouteDirectionDTO} from './dto/transit-route-direction.dto';

// --------------------------------------------
// Transit Routes Directions Service
// --------------------------------------------

export abstract class TransitRouteDirectionsService {
  /**
   * Returns the two directions that are valid for a given route. Either North/South or East/West.
   * Directions are identified with an ID value.
   * 1 = South,
   * 2 = East,
   * 3 = West,
   * 4 = North.
   *
   * @param routeId A unique identifier corresponding to the transit route
   * @returns {Observable<TransitRouteDirectionDTO[]>}
   */
  abstract getRouteDirections(
    routeId: string
  ): Observable<TransitRouteDirectionDTO[]>;
}

@Injectable()
export class NexTripRouteDirectionsService
  implements TransitRouteDirectionsService
{
  constructor(private _httpClient: HttpClient) {}

  getRouteDirections(routeId: string): Observable<TransitRouteDirectionDTO[]> {
    const routeDirectionsSubject = new AsyncSubject<
      TransitRouteDirectionDTO[]
    >();
    this._httpClient
      .get<TransitRouteDirectionDTO[]>(
        `https://svc.metrotransit.org/nextripv2/directions/${routeId}`,
        {
          responseType: 'json',
        }
      )
      .pipe(
        tap(data => {
          if (!data || typeof data !== 'object') {
            console.error(`Unexpected Data: ${data}`);
            throw new Error('Unexpected Data');
          }
        })
      )
      .subscribe(routeDirectionsSubject);

    return routeDirectionsSubject.asObservable();
  }
}

const mockRouteDirections: {[key: string]: TransitRouteDirectionDTO[]} = {
  '901': [
    {
      direction_id: 0,
      direction_name: 'Northbound',
    },
    {
      direction_id: 1,
      direction_name: 'Southbound',
    },
  ],
  '906': [
    {direction_id: 0, direction_name: 'Eastbound'},
    {direction_id: 1, direction_name: 'Westbound'},
  ],
  '923': [
    {
      direction_id: 0,
      direction_name: 'Northbound',
    },
    {
      direction_id: 1,
      direction_name: 'Southbound',
    },
  ],
  '888': [
    {direction_id: 0, direction_name: 'Eastbound'},
    {direction_id: 1, direction_name: 'Westbound'},
  ],
};

@Injectable()
export class MockRouteDirectionsService
  implements TransitRouteDirectionsService
{
  constructor() {}

  getRouteDirections(routeId: string): Observable<TransitRouteDirectionDTO[]> {
    const routeDirection = mockRouteDirections[
      routeId
    ] as TransitRouteDirectionDTO[];
    return of(routeDirection);
  }
}
