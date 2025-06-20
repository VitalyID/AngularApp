import { Injectable, signal } from '@angular/core';
// this service get signals from interseptor

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  spinnerState = signal(false);

  enableSpinner() {
    this.spinnerState.set(true);
  }

  disableSpinner() {
    this.spinnerState.set(false);
  }

  constructor() {}
}
