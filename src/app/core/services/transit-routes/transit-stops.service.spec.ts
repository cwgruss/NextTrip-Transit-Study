import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {
  MockTransitRoutesService,
  TransitRoutesService,
} from './transit-routes.service';

import {
  MockTransitStopsService,
  TransitRouteStopsService,
} from './transit-stops.service';

describe('TransitStopsService', () => {
  let service: TransitRouteStopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        {
          provide: TransitRouteStopsService,
          useClass: MockTransitStopsService,
        },
      ],
    });
    service = TestBed.inject(TransitRouteStopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
