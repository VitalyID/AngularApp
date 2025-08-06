import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { SpinnerService } from '../shared/components/spinner/serices/spinner.service';

export const SpinnerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  const shouldSkipSpinner =
    req.body && 'silentMode' in req.body && req.body.silentMode === false;

  if (shouldSkipSpinner) {
    delete req.body.silentMode;
    return next(req);
  }

  const spinnerService = inject(SpinnerService);
  spinnerService.enableSpinner();
  return next(req).pipe(
    finalize(() => {
      spinnerService.disableSpinner();
    }),
  );
};
