import { TestBed } from '@angular/core/testing';

import { TransitStopsService } from './transit-stops.service';

describe('TransitStopsService', () => {
  let service: TransitStopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransitStopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
