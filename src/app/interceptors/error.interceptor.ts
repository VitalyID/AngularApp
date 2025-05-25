import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, retry, throwError, timer } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastrService);

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
      toast.success('Ошибка при обращении к серверу', error.message);
      return throwError(() => error);
    })
  );
};
