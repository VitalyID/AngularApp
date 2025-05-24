// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { catchError, map, Observable, retry, throwError, timer } from 'rxjs';
// import { UserCard } from '../state/cards.state';
// // import * as template from 'url-template';
// // import {expand} from 'url-template';
// import { parseTemplate } from 'url-template';

// @Injectable({ providedIn: 'root' })
// export class PostCardService {
//   #http = inject(HttpClient);
//   link = 'https://tips-aarout.amvera.io/qr-codes';

// getQR(): Observable<UserCard[]> {
//   console.log('service');

//   return this.#http.get<UserCard[]>(this.link, { observe: 'response' });
//   .pipe(
//     map((response) => {
//       return response.body || [];
//     }),

//     retry({
//       count: 3,
//       delay: (error: HttpErrorResponse) => {
//         if (
//           error instanceof HttpErrorResponse &&
//           error.status >= 500 &&
//           error.status < 600
//         ) {
//           return timer(1000);
//         } else {
//           return throwError(() => error);
//         }
//       },
//     }),

//     catchError((err) => {
//       console.error('Error in getQR stream:', err);
//       return throwError(() => err);
//     })

//     // catchError((err: HttpErrorResponse) => {
//     //   if (
//     //     err instanceof HttpErrorResponse &&
//     //     err.status >= 500 &&
//     //     err.status < 600
//     //   ) {
//     //     return of([]);
//     //   } else {
//     //     return throwError(() => err);
//     //   }
//     // })
//   );
// }

// post(cards: UserCard): Observable<UserCard> {
//   console.log('отправляем в бэк', cards);
//   return this.#http.post<UserCard>(this.link, cards);
// }

// delete(id: number): Observable<UserCard> {
//   console.log('удаляем: ', id);

//   const templateId = parseTemplate('/{qr_id}');
//   const idCard = { qr_id: `${id}` };
//   const actualURL = templateId.expand(idCard);

//   return this.#http.delete<UserCard>(this.link + actualURL);
// }

//   constructor() {}
// }
