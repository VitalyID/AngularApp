import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SwitcherData } from '../types/interface/switcherDataTransmit';

@Injectable({ providedIn: 'root' })
export class SwitcherStateService {
  channelSwitcherFromService = new Subject<SwitcherData>();

  getStatusSwitcher(data: SwitcherData) {
    this.channelSwitcherFromService.next(data);
  }
}
