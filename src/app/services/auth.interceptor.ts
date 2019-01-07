import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = sessionStorage.getItem('sessionToken');
      if (token == null) {
         return next.handle(req);
      }
      console.log('Injecting session handle ' + token);
      const authReq = req.clone({
         headers: req.headers.set('Session-Id', token)
      });
      return next.handle(authReq);
   }
}
