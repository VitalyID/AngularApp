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
  ).userCreated;

  const timestampToken = Date.parse(tokenDate);

  // check date created token with current time. The difference more 5s to redirect authPage
  if (currentTimestamp - timestampToken > 300000) {
    router.navigate(['login']);
    return false;
  } else {
    return true;
  }
};
