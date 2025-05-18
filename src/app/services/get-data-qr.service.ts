import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError, timer } from 'rxjs';
import { UserCard } from '../state/cards.state';

@Injectable({
  providedIn: 'root',
})
export class GetDataQrService {
  readonly #http = inject(HttpClient);
  link: string = 'https://tips-aarout.amvera.io/qr-codes';
  link2: string =
    'https://gist.githubusercontent.com/VitalyID/dc4db55479320e040e9c4e3f123bcad1/raw/1781af7af2c4fba48abb96fce6fbd4043750af2a/gistfile1.txt';

  getQR(): Observable<UserCard[]> {
    console.log('service');

    return this.#http.get<UserCard[]>(this.link, { observe: 'response' }).pipe(
      map((response) => {
        return response.body || [];
      }),

      retry({
        count: 3,
        delay: (error: HttpErrorResponse) => {
          if (
            error instanceof HttpErrorResponse &&
            error.status >= 500 &&
            error.status < 600
          ) {
            return timer(1000);
          } else {
            return throwError(() => error);
          }
        },
      }),

      catchError((err) => {
        console.error('Error in getQR stream:', err);
        return throwError(() => err);
      })

      // catchError((err: HttpErrorResponse) => {
      //   if (
      //     err instanceof HttpErrorResponse &&
      //     err.status >= 500 &&
      //     err.status < 600
      //   ) {
      //     return of([]);
      //   } else {
      //     return throwError(() => err);
      //   }
      // })
    );
  }

  constructor() {}
}
