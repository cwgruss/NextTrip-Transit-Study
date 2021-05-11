import {ErrorHandler, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor() {}

  /**
   * Intercept and handle errors globally
   * @param error
   */
  handleError(error: any | Error): void {
    console.error(`GlobalErrorHandlerService: ${error.message}`);
  }
}
