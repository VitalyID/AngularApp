import { Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private spinnerState = signal(false);
  getSpinnerState = this.spinnerState as Signal<boolean>;

  enableSpinner() {
    this.spinnerState.set(true);
  }

  disableSpinner() {
    this.spinnerState.set(false);
  }

  constructor() {}
}
