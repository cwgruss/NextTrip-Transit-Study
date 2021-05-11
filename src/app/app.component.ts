import {Component} from '@angular/core';
import {TransitRoutesService} from './core/services/transit-routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'NextTrip';

  constructor(private _routeService: TransitRoutesService) {
    this._routeService.getActiveRoutes().subscribe(routes => {
      console.log(routes);
    });
  }
}
