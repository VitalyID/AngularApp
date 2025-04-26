import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ButtonService {
  buttonID = signal(0);

  public eventClick$ = new Subject<{ id: number }>();
  public DateFromInput$ = new Subject<{ obj: object }>();

  clickOnButton(id: number): void {
    this.eventClick$.next({ id });
  }

  transmitData(obj: object): void {
    this.DateFromInput$.next({ obj });
  }
}
