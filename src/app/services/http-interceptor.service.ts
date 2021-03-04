import { Injectable } from '@angular/core';
import { url } from 'src/environments/environment';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { JwtauthService } from './jwtauth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {
  url = url.local
  constructor( private autenticadorJwt: JwtauthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.autenticadorJwt.recuperarJwt();

    if(token){
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });

    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json; charset=utf-8') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    const newUrl = {url: this.url + request.url};
    request = Object.assign(request, newUrl);
    const newUrlWithParams = {urlWithParams: this.url + request.urlWithParams};
    request = Object.assign(request, newUrlWithParams);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      finalize(() => {
      })
      );


  }
}
