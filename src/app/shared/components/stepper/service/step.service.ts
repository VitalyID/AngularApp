import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StepperConfig } from '../types/interfaces/stepperConfig';
import { UpdateUserInfo } from '../../../../state/user/user.models';

@Injectable({ providedIn: 'root' })
export class StepService {
  changeStep$ = new Subject<StepperConfig>();

  emitStepData$ = new Subject<UpdateUserInfo>();
}
