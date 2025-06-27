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

  console.log('guard:', currentTimestamp, timestampToken);

  if (isNaN(timestampToken) || currentTimestamp - timestampToken > 300000) {
    router.navigate(['login']);
    return false;
  } else {
    return true;
  }
};
