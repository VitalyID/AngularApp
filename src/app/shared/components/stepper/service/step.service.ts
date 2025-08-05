import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StepService {
  changeStep$ = new Subject<number>();
}
