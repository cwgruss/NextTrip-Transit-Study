import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {
  MockTransitRoutesService,
  TransitRoutesService,
} from './transit-routes.service';

describe('RoutesService', () => {
  let service: TransitRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        {
          provide: TransitRoutesService,
          useClass: MockTransitRoutesService,
        },
      ],
    });
    service = TestBed.inject(TransitRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
