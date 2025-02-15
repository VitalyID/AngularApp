import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class switchOnService {
  eventChangeInput$ = new Subject<boolean>();

  statusInput?: boolean;

  handleClickOnPerioidTab(name: string) {
    if (name === 'forPeriod') {
      this.statusInput = true;
      this.eventChangeInput$.next(this.statusInput);
    } else {
      this.statusInput = false;
      this.eventChangeInput$.next(this.statusInput);
    }
  }
}
