import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RefreshTokenService {
  isRefresh = new BehaviorSubject<boolean>(false);
  isNewToken = new BehaviorSubject<string | null>(null);
}
