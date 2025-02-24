import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoutIDservice {
  SendRouteService$ = new Subject<number>();

  getDataRoute(data: number) {
    this.SendRoute(data);
  }

  SendRoute(data: number) {
    this.SendRouteService$.next(data);
  }
}
