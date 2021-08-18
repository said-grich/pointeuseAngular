import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from "./login/token-storage.service";

@Injectable()
export class Interceptor1Interceptor implements HttpInterceptor {

  constructor(private  tokenService:TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    request.clone({
      setHeaders:{
        Authorization:'Bearer '+this.tokenService.getToken()
      }
    })

    return next.handle(request);
  }
}
