import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserSetButtonService {
  channelDataInputTips$ = new Subject<{}>();

  getTipsFromInput(data: {}) {
    console.log('Данные на сервис пришли: ', data);

    this.channelDataInputTips$.next(data);
  }
}
