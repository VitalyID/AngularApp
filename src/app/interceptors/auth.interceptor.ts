import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  catchError,
  filter,
  finalize,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { urlForAuth } from '../const';
import { LocalStorigeService } from '../services/local-storige.service';
import { RefreshTokenService } from '../services/refreshing.service';
import { RefreshToken } from '../state/auth/auth.action';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const storageService = inject(LocalStorigeService);
  const router = inject(Router);
  const store = inject(Store);
  const refreshService = inject(RefreshTokenService);

  if (!storageService.getLocalStorige()) {
    router.navigate(['user-auth', 'login']);
    return throwError(() => new Error('No data in localStorage'));
  }

  const user = getUser(storageService);

  if (
    urlForAuth.some((url) => {
      return req.url.includes(url);
    })
  ) {
    const authReq = addTokenRequest(req, user.access_token);
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return handler401Err(
            req,
            storageService,
            next,
            router,
            store,
            refreshService,
          );
        }
        return throwError(() => error);
      }),
    );
  }

  return next(req);
}

function addTokenRequest(req: HttpRequest<unknown>, token: string) {
  return req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
    body: req.body,
  });
}

function getUser(storageService: LocalStorigeService) {
  return JSON.parse(storageService.getLocalStorige()) || {};
}

function newReq(
  req: HttpRequest<unknown>,
  storageService: LocalStorigeService,
): HttpRequest<unknown> {
  const user = getUser(storageService);
  const authReq = addTokenRequest(req, user.access_token);

  return authReq;
}

function handler401Err(
  req: HttpRequest<unknown>,
  storageService: LocalStorigeService,
  next: HttpHandlerFn,
  router: Router,
  store: Store,
  refreshService: RefreshTokenService,
): Observable<HttpEvent<unknown>> {
  // NOTE: if in current ti,e token is no updating
  if (!refreshService.isRefresh.getValue()) {
    refreshService.isRefresh.next(true);
    refreshService.isNewToken.next(null);
    return store.dispatch(new RefreshToken()).pipe(
      switchMap(() => {
        refreshService.isNewToken.next(getUser(storageService).access_token);
        return next(newReq(req, storageService));
      }),

      catchError(() => {
        router.navigate(['user-auth', 'login']);
        return throwError(() => new Error('Error update token'));
      }),

      finalize(() => {
        refreshService.isRefresh.next(false);
        refreshService.isNewToken.next(null);
      }),
    );
  } else {
    return refreshService.isNewToken.pipe(
      filter((access_token): access_token is string => access_token !== null),
      take(1),
      switchMap((access_token) => {
        return next(addTokenRequest(req, access_token));
      }),
    );
  }
}
