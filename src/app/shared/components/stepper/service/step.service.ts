import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { StepperConfig } from '../types/interfaces/stepperConfig';
import { UpdateUserInfo } from '../../../../state/user/user.models';

@Injectable({ providedIn: 'root' })
export class StepService {
  changeStep$ = new Subject<number>();

  emitStepData$ = new Subject<UpdateUserInfo>();

  isFormInValid$ = new BehaviorSubject<boolean>(true);
}
