import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { urlForAuth } from '../const';
import { LocalStorigeService } from '../services/local-storige.service';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const token = JSON.parse(
    inject(LocalStorigeService).getLocalStorige(),
  ).access_token;

  if (
    urlForAuth.some((url) => {
      return req.url.includes(url);
    })
  ) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
    return next(newReq);
  }

  return next(req);
}
