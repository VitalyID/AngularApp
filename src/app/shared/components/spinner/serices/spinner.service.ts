import { Component, Injectable, signal, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpinnerConfig } from './../types/spinner-config';
// NOTE: this service get signals from interseptor

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  spinnerState = new BehaviorSubject<SpinnerConfig>({
    isActive: false,
    id: '',
    source: null,
    nameIcon: 'icon-spinner',
  });

  enableSpinner() {
    const newSpinner = { ...this.spinnerState.getValue(), isActive: true };
    this.spinnerState.next(newSpinner);
  }

  disableSpinner() {
    const newSpinner = { ...this.spinnerState.getValue(), isActive: false };
    this.spinnerState.next(newSpinner);
  }

  setSource(source: Type<Component>) {
    const spinnerConfig = { ...this.spinnerState.getValue(), source };
    this.spinnerState.next(spinnerConfig);
  }
}
