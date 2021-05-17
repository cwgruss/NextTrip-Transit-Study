import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {
  TransitRoutesService,
  MockTransitRoutesService,
} from 'src/app/core/services/transit-routes';
import {
  TransitRouteDirectionsService,
  MockRouteDirectionsService,
} from 'src/app/core/services/transit-routes/route-directions.service';
import {
  TransitRouteDeparturesService,
  MockTransitDeparturesService,
} from 'src/app/core/services/transit-routes/transit-departures.service';
import {
  TransitRouteStopsService,
  MockTransitStopsService,
} from 'src/app/core/services/transit-routes/transit-stops.service';

import {TransitFilterComponent} from './transit-filter.component';

describe('TransitFilterComponent', () => {
  let component: TransitFilterComponent;
  let fixture: ComponentFixture<TransitFilterComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TransitFilterComponent],
      providers: [
        HttpClient,
        {provide: ActivatedRoute, useValue: {queryParams: of([])}},
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
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitFilterComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
