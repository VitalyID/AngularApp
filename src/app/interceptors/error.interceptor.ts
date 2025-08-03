import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, retry, throwError, timer } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastrService);
  const router = inject(Router);

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
        } else if (error instanceof HttpErrorResponse && error.status === 400) {
          toast.error('Такой пользователь существует.');
          return throwError(() => error);
        } else {
          return of(error);
        }
      },
    }),
    catchError((error: HttpErrorResponse | any) => {
      if (error instanceof HttpErrorResponse && error.status === 400) {
        return throwError(() => error);
      }

      if (error instanceof HttpErrorResponse && error.status === 401) {
        toast.error('Ошибка авторизации');
        router.navigate(['user-auth/:login']);
        return throwError(() => error);
      }

      toast.success('Ошибка при обращении к серверу', error.message);
      return throwError(() => error);
    }),
  );
};
