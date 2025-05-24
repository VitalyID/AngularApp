import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { catchError, retry, throwError, timer } from 'rxjs';
import { ErrorServer } from '../state/cards.action';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  return next(req).pipe(
    retry({
      count: 3,
      delay: (error: HttpErrorResponse) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status >= 500 &&
          error.status < 600
        ) {
          return timer(2000);
        } else {
          throw error;
        }
      },
    }),
    catchError((error: HttpErrorResponse | any) => {
      console.log('Получена ошибка сервера в интерсепторе: ', error);
      store.dispatch(new ErrorServer(error));
      return throwError(() => error);
    })
  );
};
