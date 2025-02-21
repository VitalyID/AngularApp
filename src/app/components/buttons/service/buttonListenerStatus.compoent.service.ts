import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ButtonData } from './../../../types/sectionItem';

@Injectable({
  providedIn: 'root',
})
export class ListenerService {
  public aboutBTN$ = new Subject<{ data: ButtonData }>();

  getStatusForBTN(data: ButtonData) {
    this.transmitDataBTN(data);
    console.log(data);
  }

  transmitDataBTN(data: ButtonData): void {
    this.aboutBTN$.next({ data });
  }
}
