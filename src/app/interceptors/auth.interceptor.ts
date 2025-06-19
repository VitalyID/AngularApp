import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, switchMap, take } from 'rxjs';
import { urlForAuth } from '../const';
import { ListOfCards } from '../state/cards.state';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const store = inject(Store);

  if (
    urlForAuth.some((url) => {
      req.url.includes(url);
    })
  ) {
    const user = store.select(ListOfCards.getUserData).pipe(
      take(1),
      switchMap((user) => {
        if (!user.token) {
          console.log(user.token);

          return next(req);
        } else {
          const headers = req.headers.set(
            'Authorization',
            ` Bearer ${user.token}`
          );
          const authReq = req.clone({ headers });
          return next(authReq);
        }
      })
    );
    return user;
  } else return next(req);
};
