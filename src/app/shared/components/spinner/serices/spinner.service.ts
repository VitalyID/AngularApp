import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  spinnerState = signal(false);

  enableSpinner() {
    this.spinnerState.set(true);
    console.log('On');
  }

  disableSpinner() {
    this.spinnerState.set(false);
    console.log('Off');
  }

  constructor() {}
}
