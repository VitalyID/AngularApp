import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class switchOnService {
  statusInput?: boolean;
  eventChangeInput$ = new Subject<boolean>();

  handleClickOnPerioidTab(id: number) {
    if (id === 5) {
      this.statusInput = true;
      this.eventChangeInput$.next(this.statusInput);
    } else {
      this.statusInput = false;
      this.eventChangeInput$.next(this.statusInput);
    }
  }
}
