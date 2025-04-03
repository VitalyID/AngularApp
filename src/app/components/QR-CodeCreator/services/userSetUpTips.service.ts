import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserSetting } from '../../../shared/components/input-text/types/interfaces/UserDataSetting';

@Injectable({ providedIn: 'root' })
export class UserSetButtonService {
  channelDataInputTips$ = new Subject<{}>();

  getTipsFromInput(data: UserSetting) {
    this.channelDataInputTips$.next(data);
  }
}
