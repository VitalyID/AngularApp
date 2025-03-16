import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoutIDservice {
  SendRouteService$ = new Subject<number>();

  getIDroute(data: number) {
    this.SendRouteService$.next(data);
  }
}
