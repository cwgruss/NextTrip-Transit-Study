import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AsyncSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TransitRoutePlaceDTO} from './dto/transit-place.dto';

// --------------------------------------------
// Transit Stop Service
// --------------------------------------------

export abstract class TransitRouteStopsService {
  /**
   * Returns a list of Timepoint stops for the given Route/Direction.
   * @returns {Observable<TransitRoutePlaceDTO[]>}
   */
  abstract getRouteStops(
    routeId: string,
    directionId: number
  ): Observable<TransitRoutePlaceDTO[]>;
}

@Injectable()
export class NexTripTransitStopsService implements TransitRouteStopsService {
  constructor(private _httpClient: HttpClient) {}

  getRouteStops(
    routeId: string,
    directionId: number
  ): Observable<TransitRoutePlaceDTO[]> {
    const routeStopSubject = new AsyncSubject<TransitRoutePlaceDTO[]>();
    this._httpClient
      .get<TransitRoutePlaceDTO[]>(
        `https://svc.metrotransit.org/nextripv2/stops/${routeId}/${directionId}`,
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
      .subscribe(routeStopSubject);

    return routeStopSubject.asObservable();
  }
}
