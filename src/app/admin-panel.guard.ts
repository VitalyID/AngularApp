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
  state: RouterStateSnapshot
) => {
  const authService = inject(LocalStorigeService);
  const router = inject(Router);

  const currentTimestamp = new Date().getTime();

  const tokenDate: string = JSON.parse(
    authService.getLocalStorige()
  ).tokenUpdated_at;

  const timestampToken = Date.parse(tokenDate);

  // check date created token with current time. The difference more 5m to redirect authPage

  // console.log('guard:', currentTimestamp, timestampToken);

  if (isNaN(timestampToken)) {
    router.navigate(['user-auth']);
    return false;
  } else if (currentTimestamp - timestampToken > 300000) {
    // console.log('noGuard');

    router.navigate(['user-auth', 'login']);
    return false;
  } else {
    // console.log('okGuard');

    return true;
  }
};
