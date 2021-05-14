import {Injectable} from '@angular/core';
import {AsyncSubject, Observable, of} from 'rxjs';
import {TransitRouteDTO} from './dto/transit-route.dto';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

// --------------------------------------------
// Transit Routes Service
// --------------------------------------------

export abstract class TransitRoutesService {
  /**
   * Get a list of all active bus routes for the current service day.
   * @returns {Observable<TransitRouteDTO[]>}
   */
  abstract getActiveRoutes(): Observable<TransitRouteDTO[]>;
}

/**
 *
 */
@Injectable()
export class NexTripTransitRoutesService implements TransitRoutesService {
  constructor(private _httpClient: HttpClient) {}

  /**
   * Fetches a list of all active bus routes for the current service day.
   * @returns {Observable<TransitRouteDTO[]>}
   */
  getActiveRoutes(): Observable<TransitRouteDTO[]> {
    const activeRoutesSubject = new AsyncSubject<TransitRouteDTO[]>();
    this._httpClient
      .get<TransitRouteDTO[]>('https://svc.metrotransit.org/nextripv2/routes', {
        responseType: 'json',
      })
      .pipe(
        tap(data => {
          if (!data || typeof data !== 'object') {
            console.error(`Unexpected Data: ${data}`);
            throw new Error('Unexpected Data');
          }
        })
      )
      .subscribe(activeRoutesSubject);

    return activeRoutesSubject.asObservable();
  }
}

@Injectable()
export class MockTransitRoutesService implements TransitRoutesService {
  constructor() {}

  /**
   * Fetches a list of all active bus routes for the current service day.
   * @returns {Observable<TransitRouteDTO[]>}
   */
  getActiveRoutes(): Observable<TransitRouteDTO[]> {
    return of([
      {route_id: '901', agency_id: 0, route_label: 'METRO Blue Line'},
      {route_id: '906', agency_id: 10, route_label: 'Airport Shuttle'},
      {route_id: '923', agency_id: 0, route_label: 'METRO C Line'},
      {route_id: '888', agency_id: 0, route_label: 'Northstar Commuter Rail'},
    ]);
  }
}
