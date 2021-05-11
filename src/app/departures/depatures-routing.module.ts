import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'transit-stop',
    loadChildren: () =>
      import('./stop-filter/stop-filter.module').then(
        m => m.TransitStopFilterModule
      ),
  },
  {
    path: 'transit-route',
    loadChildren: () =>
      import('./route-filter/route-filter.module').then(
        m => m.TransitRouteFilterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DepaturesRoutingModule {}
