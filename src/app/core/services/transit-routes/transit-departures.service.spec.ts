import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {
  MockTransitDeparturesService,
  TransitRouteDeparturesService,
} from './transit-departures.service';
import {TransitRoutesService} from './transit-routes.service';

describe('TransitDeparturesService', () => {
  let service: TransitRouteDeparturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        {
          provide: TransitRouteDeparturesService,
          useClass: MockTransitDeparturesService,
        },
      ],
    });
    service = TestBed.inject(TransitRouteDeparturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
