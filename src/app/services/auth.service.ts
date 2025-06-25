import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { auth } from '../const';
import { AuthResponse, CreateUserResponse } from '../state/cards.state';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #http = inject(HttpClient);

  // if we get err 400, it means user is registered and need get token

  registerUser(
    phone: string,
    password: string
  ): Observable<CreateUserResponse | boolean> {
    return this.#http
      .post<CreateUserResponse>(`${auth}/register`, {
        phone: `${phone}`,
        password: `${password}`,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            return of(false);
          } else return throwError(() => error);
        })
      );
  }

  login(phone: string, password: string): Observable<AuthResponse> {
    return this.#http.post<AuthResponse>(`${auth}/login`, {
      phone: `${phone}`,
      password: `${password}`,
    });
  }
  constructor() {}
}

// authUser(
//   phone: string,
//   pwd: string
// ): Observable<CreateUserResponse | AuthResponse | HttpErrorResponse> {
//   return this.#http
//     .post<CreateUserResponse>(`${auth}/register`, {
//       phone: `${phone}`,
//       password: `${pwd}`,
//     })
//     .pipe(
//       // tap(() => {}),
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 400) {
//           return this.#http.post<AuthResponse>(`${auth}/login`, {
//             phone: `${phone}`,
//             password: `${pwd}`,
//           });
//         } else {
//           // console.log(error.message, error.status);
//         }
//         return of(error);
//       })
//     );
// }
