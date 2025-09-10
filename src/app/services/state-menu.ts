import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StateMenuService {
  stateMenuService = new BehaviorSubject<boolean>(false);
}
