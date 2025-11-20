import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HomeComponent } from '../../../../components/layouts/home/home.component';
import { SpinnerComponent } from '../spinner.component';
import { SpinnerConfig } from './../types/interfaces/spinnerConfig';
// NOTE: this service get signals from interseptor to enabled and disabled

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  spinnerState = new BehaviorSubject<SpinnerConfig>({
    isActive: false,
    container: HomeComponent,
    insertComponent: SpinnerComponent,
  });

  enableSpinner() {
    this.spinnerState.next({ ...this.spinnerState.getValue(), isActive: true });
  }

  disableSpinner() {
    this.spinnerState.next({
      ...this.spinnerState.getValue(),
      isActive: false,
    });
  }

  setContainer(container: Type<any>, id = '') {
    this.spinnerState.next({ ...this.spinnerState.getValue(), container, id });
  }
}
