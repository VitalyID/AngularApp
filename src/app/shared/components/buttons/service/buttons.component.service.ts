import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ButtonService {
  public eventClick$ = new Subject<{ id: number }>();
  public DateFromInput$ = new Subject<{ obj: object }>();

  clickOnButton(id: number): void {
    this.eventClick$.next({ id });
  }

  transmitData(obj: object): void {
    this.DateFromInput$.next({ obj });
  }
}
