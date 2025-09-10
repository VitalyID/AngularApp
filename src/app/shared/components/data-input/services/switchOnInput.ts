import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class switchOnService {
  eventChangeInput$ = new Subject<boolean>();

  handleClickOnPerioidTab(name: string) {
    this.eventChangeInput$.next(Boolean(name === 'forPeriod'));
  }
}
