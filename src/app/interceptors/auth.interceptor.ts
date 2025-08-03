import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { urlForAuth } from '../const';
import { AuthService } from '../services/auth.service';
import { LocalStorigeService } from '../services/local-storige.service';
import { RefreshToken } from '../types/interfaces/refreshToken';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const user = JSON.parse(inject(LocalStorigeService).getLocalStorige()) || {};
  const authService = inject(AuthService);
  const storageService = inject(LocalStorigeService);

  if (
    urlForAuth.some((url) => {
      return req.url.includes(url);
    })
  ) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${user.token}`),
    });
    return next(newReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // NOTE: we don't send request for refresh
        if (error.status === 401 && !req.url.includes('/api/refresh')) {
          return authService.refresh().pipe(
            tap((response: RefreshToken) => {
              const newUser = {
                ...user,
                access_token: response.access_token,
                tokenUpdated_at: new Date().toString(),
              };
              storageService.sendToLocalStorige(JSON.stringify(newUser));
            }),
            switchMap((response: RefreshToken) => {
              const newToken = response.access_token;
              const newReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken}`),
              });
              return next(newReq);
            }),
          );
        }
        return throwError(() => error);
      }),
    );
  }

  return next(req);
}
