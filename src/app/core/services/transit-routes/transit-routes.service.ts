import {Injectable} from '@angular/core';
import {AsyncSubject, Observable} from 'rxjs';
import {TransitRouteDTO} from './dto/transit-route.dto';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
// --------------------------------------------
// Transit Routes Service
// --------------------------------------------

/**
 *
 */
@Injectable({
  providedIn: 'root',
})
export class TransitRoutesService {
  constructor(private _httpClient: HttpClient) {}

  /**
   * Gets a list of all active bus routes for the current service day.
   * @see https://svc.metrotransit.org/swagger/index.html#operations-NexTrip-get_nextripv2_routes
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
