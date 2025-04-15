import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoutIDservice {
  // SendRouteService$ = new Subject<number>();
  SendRouteService$ = new BehaviorSubject<number>(1);

  getIDroute(data: number) {
    this.SendRouteService$.next(data);
  }
}
