import {TestBed} from '@angular/core/testing';
import {TransitRouteFacadeService} from './transit-route-facade.service';

describe('TransitRouteFacadeService', () => {
  let service: TransitRouteFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransitRouteFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
