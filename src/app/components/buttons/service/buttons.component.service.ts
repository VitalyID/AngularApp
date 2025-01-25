import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ButtonService {
  public eventClick$ = new Subject<{ id: number }>();

  clickOnButton(id: number): void {
    this.eventClick$.next({ id });
  }

  public DateFromInput$ = new Subject<{ obj: object }>();

  transmitData(obj: object): void {
    this.DateFromInput$.next({ obj });
  }
}
