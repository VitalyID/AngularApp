import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { urlForAuth } from '../const';
import { ListOfCards } from '../state/cards.state';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const store = inject(Store);

  // console.log(
  //   store.select(ListOfCards.getUserData).subscribe((data) => {
  //     data.token;
  //   })
  // );

  if (
    urlForAuth.some((url) => {
      req.url.includes(url);
    })
  ) {
    const user: Signal<{
      phone: string;
      password: string;
      token: string;
      userCreated: string;
    }> = store.selectSignal(ListOfCards.getUserData);
    console.log(9999, user());

    if (!user().token) {
      console.log(user().token);

      return next(req);
    } else {
      console.log('token', user().token);

      const headers = req.headers.set(
        'Authorization',
        ` Bearer ${user().token}`
      );
      const authReq = req.clone({ headers });
      return next(authReq);
    }

    // return user();
  } else return next(req);
};
