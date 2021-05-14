import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  TransitRoutesService,
  MockTransitRoutesService,
} from './transit-routes.service';
import {
  MockRouteDirectionsService,
  NexTripRouteDirectionsService,
  TransitRouteDirectionsService,
} from './route-directions.service';
import {
  NexTripTransitStopsService,
  TransitRouteStopsService,
} from './transit-stops.service';
import {
  NexTripTransitDeparturesService,
  TransitRouteDeparturesService,
} from './transit-departures.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class TransitRoutesModule {
  constructor(@Optional() @SkipSelf() parentModule?: TransitRoutesModule) {
    // Ensure TransitRoutesService is a singleton service
    if (parentModule) {
      throw new Error(
        `TransitRoutesModule has already been loaded. Import only in root AppModule.`
      );
    }
  }

  static forRoot(): ModuleWithProviders<TransitRoutesModule> {
    return {
      ngModule: TransitRoutesModule,
      providers: [
        {provide: TransitRoutesService, useClass: MockTransitRoutesService},
        {
          provide: TransitRouteDirectionsService,
          useClass: NexTripRouteDirectionsService,
        },
        {
          provide: TransitRouteStopsService,
          useClass: NexTripTransitStopsService,
        },
        {
          provide: TransitRouteDeparturesService,
          useClass: NexTripTransitDeparturesService,
        },
      ],
    };
  }
}
