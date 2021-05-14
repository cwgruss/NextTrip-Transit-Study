import {Injectable} from '@angular/core';
import {AsyncSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {NexTripResultDTO} from './dto/nextrip-result.dto';

// --------------------------------------------
// Transit Departures Service
// --------------------------------------------

export abstract class TransitRouteDeparturesService {
  /**
   * Returns a list of departures scheduled for any given bus stop
   * @param routeId A unique identifier corresponding to the transit route
   * @param directionId A unique identifier signaling the desired departure direction
   * @param placeCode The place code identifying the location from which to depart from
   * @returns {Observable<NexTripResultDTO[]>}
   */
  abstract getRouteDepartures(
    routeId: string,
    directionId: number,
    placeCode: string
  ): Observable<NexTripResultDTO>;
}

/**
 * NextTrip Departures Service
 * Used to fetch a list of transit departures for any given stop along a route.
 */
@Injectable()
export class NexTripTransitDeparturesService
  implements TransitRouteDeparturesService
{
  constructor(private _httpClient: HttpClient) {}

  getRouteDepartures(
    routeId: string,
    directionId: number,
    placeCode: string
  ): Observable<NexTripResultDTO> {
    const routeDeparturesSubject = new AsyncSubject<NexTripResultDTO>();
    this._httpClient
      .get<NexTripResultDTO>(
        `https://svc.metrotransit.org/nextripv2/${routeId}/${directionId}/${placeCode}`,
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
      .subscribe(routeDeparturesSubject);

    return routeDeparturesSubject.asObservable();
  }
}

// @Injectable()
// export class MockTransitDeparturesService implements TransitRoutesService {
//   constructor() {}

//   /**
//    * Fetches a list of all active bus routes for the current service day.
//    * @returns {Observable<TransitRouteDTO[]>}
//    */
//   getActiveRoutes(): Observable<TransitRouteDTO[]> {
//     return of([
//       {route_id: '901', agency_id: 0, route_label: 'METRO Blue Line'},
//       {route_id: '906', agency_id: 10, route_label: 'Airport Shuttle'},
//       {route_id: '923', agency_id: 0, route_label: 'METRO C Line'},
//       {route_id: '888', agency_id: 0, route_label: 'Northstar Commuter Rail'},
//     ]);
//   }
// }
