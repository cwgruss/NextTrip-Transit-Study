import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TransitRoutesService} from './core/services/transit-routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Case Study | NextTrip';

  constructor(private _titleEl: Title) {
    this._titleEl.setTitle(this.title);
  }
}
