import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor 
{
  constructor(
    public authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const requestUri = request.url;
    if(requestUri.endsWith('auth/login'))
    {
      let headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=UTF-8')
      .set("X-Requested-With", 'XMLHttpRequest')

      const authReq = request.clone({
        headers: headers
      });

      return next.handle(authReq);
    }

    return next.handle(request);
  }

}
