import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorigeService } from './services/local-storige.service';

export const adminPanelGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(LocalStorigeService);
  const router = inject(Router);

  const currentTimestamp = new Date().getTime();

  if (!authService.getLocalStorige()) {
    router.navigate(['user-auth', 'login']);
    return false;
  }

  const tokenDate: string = JSON.parse(
    authService.getLocalStorige(),
  ).tokenUpdated_at;

  const timestampToken = Date.parse(tokenDate);

  // NOTE: check date created token with current time. The difference more 5m to redirect authPage

  if (isNaN(timestampToken)) {
    router.navigate(['user-auth']);
    return false;
  } else if (currentTimestamp - timestampToken > 1740000) {
    router.navigate(['user-auth', 'login']);
    return false;
  } else {
    return true;
  }
};
