import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ErrorHandlerModule} from './core/interceptors/error-handler';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ErrorHandlerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
