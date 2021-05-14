import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StopFilterComponent} from './stop-filter.component';

const routes: Routes = [{path: '', component: StopFilterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StopFilterRoutingModule {}
