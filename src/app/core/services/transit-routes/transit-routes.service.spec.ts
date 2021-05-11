import {TestBed} from '@angular/core/testing';

import {TransitRoutesService} from './transit-routes.service';

describe('RoutesService', () => {
  let service: TransitRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransitRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
