import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StopFilterRoutingModule} from './stop-filter-routing.module';
import {StopFilterComponent} from './stop-filter.component';

@NgModule({
  declarations: [StopFilterComponent],
  imports: [CommonModule, StopFilterRoutingModule],
})
export class TransitStopFilterModule {}
