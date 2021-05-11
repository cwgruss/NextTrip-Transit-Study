import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpErrorHandlerInterceptor} from './http-error-handler.interceptor';
import {GlobalErrorHandlerService} from './global-error-handler.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true,
    },
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService},
  ],
})
export class ErrorHandlerModule {}
