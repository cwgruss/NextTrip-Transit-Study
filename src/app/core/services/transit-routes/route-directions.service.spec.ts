import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {
  MockRouteDirectionsService,
  NexTripRouteDirectionsService,
  TransitRouteDirectionsService,
} from './route-directions.service';
import {
  TransitRouteDeparturesService,
  MockTransitDeparturesService,
} from './transit-departures.service';
import {
  MockTransitRoutesService,
  TransitRoutesService,
} from './transit-routes.service';

describe('RouteDirectionsService', () => {
  let service: TransitRouteDirectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        {
          provide: TransitRouteDirectionsService,
          useClass: MockRouteDirectionsService,
        },
      ],
    });
    service = TestBed.inject(TransitRouteDirectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
