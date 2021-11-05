import { ErrorInterceptor } from './error-interceptor';
import { LoaderInterceptor } from './loader.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { BaseUrlInterceptor } from './base-url-interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  // { provide: HTTP_INTERCEPTORS, useClass: SanctumInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }

];
