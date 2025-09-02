import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// NOTE: this service get signals from interseptor to enabled and disabled

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  spinnerState = new BehaviorSubject<boolean>(false);

  enableSpinner() {
    this.spinnerState.next(true);
  }

  disableSpinner() {
    this.spinnerState.next(false);
  }
}
