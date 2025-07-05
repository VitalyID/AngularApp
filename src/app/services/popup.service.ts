import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  popupState$ = new BehaviorSubject<boolean>(true);

  setPopupState(data: boolean) {
    this.popupState$.next(data);
  }
}
