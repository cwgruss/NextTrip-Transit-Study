import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'transit-route',
  },
  {
    path: 'transit-stop',
    loadChildren: () =>
      import('./features/stop-filter/stop-filter.module').then(
        m => m.TransitStopFilterModule
      ),
  },
  {
    path: 'transit-route',
    loadChildren: () =>
      import('./features/route-filter/route-filter.module').then(
        m => m.TransitRouteFilterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DepaturesRoutingModule {}
