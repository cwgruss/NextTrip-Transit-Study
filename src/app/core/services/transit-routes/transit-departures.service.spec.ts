import {TestBed} from '@angular/core/testing';

import {TransitDeparturesService} from './transit-departures.service';

describe('TransitDeparturesService', () => {
  let service: TransitDeparturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransitDeparturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
