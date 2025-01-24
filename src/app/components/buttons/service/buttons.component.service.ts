import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ButtonService {
  public eventClick$ = new Subject<number>();

  clickOnButton(): void {}

  public eventClickIsDone(eventClick: number) {
    this.eventClick$.next(eventClick);
  }
}
