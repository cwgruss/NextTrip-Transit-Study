import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ErrorHandlerModule} from './core/interceptors/error-handler';
import {TransitRoutesModule} from './core/services/transit-routes';
import {DeparturesModule} from './departures/departures.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DeparturesModule,
    HttpClientModule,
    ErrorHandlerModule,
    TransitRoutesModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
