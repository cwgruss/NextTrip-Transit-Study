import {HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {
  MockTransitRoutesService,
  TransitRoutesService,
} from 'src/app/core/services/transit-routes';
import {
  MockRouteDirectionsService,
  TransitRouteDirectionsService,
} from 'src/app/core/services/transit-routes/route-directions.service';
import {
  MockTransitDeparturesService,
  TransitRouteDeparturesService,
} from 'src/app/core/services/transit-routes/transit-departures.service';
import {
  MockTransitStopsService,
  TransitRouteStopsService,
} from 'src/app/core/services/transit-routes/transit-stops.service';
import {TransitRouteFacade} from './transit-route-facade.service';

describe('TransitRouteFacade', () => {
  let service: TransitRouteFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: TransitRoutesService,
          useClass: MockTransitRoutesService,
        },
        {
          provide: TransitRouteDirectionsService,
          useClass: MockRouteDirectionsService,
        },
        {
          provide: TransitRouteStopsService,
          useClass: MockTransitStopsService,
        },
        {
          provide: TransitRouteDeparturesService,
          useClass: MockTransitDeparturesService,
        },
      ],
    });
    service = TestBed.inject(TransitRouteFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
