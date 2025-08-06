import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { auth } from '../const';
import { UserAuthStateModel } from '../state/auth/auth.state';
import { RefreshToken } from '../types/interfaces/refreshToken';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #http = inject(HttpClient);

  registerUser(
    phone: string,
    password: string,
  ): Observable<UserAuthStateModel> {
    return this.#http.post<UserAuthStateModel>(`${auth}/register`, {
      phone: `${phone}`,
      password: `${password}`,
    });
  }

  login(
    phone: string,
    password: string,
    silentMode: boolean,
  ): Observable<UserAuthStateModel> {
    return this.#http.post<UserAuthStateModel>(`${auth}/login`, {
      phone: `${phone}`,
      password: `${password}`,
      silentMode: `${silentMode}`,
    });
  }

  refresh(): Observable<RefreshToken> {
    return this.#http.post<RefreshToken>(`${auth}/refresh`, {});
  }
}
