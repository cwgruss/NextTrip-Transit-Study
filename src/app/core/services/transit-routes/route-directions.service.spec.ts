import {TestBed} from '@angular/core/testing';

import {NexTripRouteDirectionsService} from './route-directions.service';

describe('RouteDirectionsService', () => {
  let service: NexTripRouteDirectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NexTripRouteDirectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
