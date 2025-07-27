import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Popup } from '../types/interfaces/popup';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  popupState$ = new BehaviorSubject<Popup>({
    id: '',
    state: false,
    component: null,
  });
}
