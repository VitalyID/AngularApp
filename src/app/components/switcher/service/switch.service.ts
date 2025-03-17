import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SwitcherStateService {
  channelSwitcherFromService = new Subject<any>();

  getStatusSwitcher(data: {}) {
    this.channelSwitcherFromService.next(data);
  }
}
