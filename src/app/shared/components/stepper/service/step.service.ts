import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UpdateUserInfo } from '../../../../state/user/user.state';

@Injectable({ providedIn: 'root' })
export class StepService {
  changeStep$ = new Subject<number>();
}
