import { Injectable, signal } from '@angular/core';
// this service get signals from interseptor

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  spinnerState = signal(false);

  enableSpinner() {
    this.spinnerState.set(true);
    console.log('On', new Date());
  }

  disableSpinner() {
    this.spinnerState.set(false);
    console.log('Off', new Date());
  }

  constructor() {}
}
