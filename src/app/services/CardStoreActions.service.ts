import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError, timer } from 'rxjs';
import { parseTemplate } from 'url-template';
import { RequestServer } from '../types/enums/cardServicerequest';
import { UserCard } from './../state/cards.state';

@Injectable({ providedIn: 'root' })
export class CardService {
  link = 'https://tips-aarout.amvera.io/qr-codes';

  #http = inject(HttpClient);

  // post & put
  sendRequestWrap(
    request: RequestServer.put | RequestServer.post,
    argument: UserCard
  ): Observable<void>;

  // delete
  sendRequestWrap(
    request: RequestServer.delete,
    argument: number
  ): Observable<void>;

  // get
  sendRequestWrap(request: RequestServer): Observable<UserCard[]>;

  sendRequestWrap(
    request: RequestServer | (RequestServer.put | RequestServer.post),
    argument?: number | UserCard
  ): Observable<UserCard[] | void> {
    let url: string = '';
    if (request === RequestServer.get) {
    } else if (request === RequestServer.post) {
      argument = argument as UserCard;
    } else if (request === RequestServer.put) {
      argument = argument as UserCard;
    } else if (request === RequestServer.delete) {
      argument = argument as number;
      url = this.newUrl(argument);
    }
    return this.sendRequest(request, url ?? this.link, argument);
  }

  newUrl(argument: number): string {
    const templateId = parseTemplate('/{qr_id}');
    const idCard = { qr_id: `${argument}` };
    const actualURL = templateId.expand(idCard);

    return this.link + actualURL;
  }

  sendRequest<T>(
    request: RequestServer,
    url: string,
    argument?: UserCard | number
  ): Observable<UserCard[] | void> {
    type ErrorMessage<T> =
      | { suсcess: true; data: T }
      | { suсcess: false; error: HttpErrorResponse };
    return this.#http
      .request<UserCard[] | void>(request, this.link, {
        body: argument,
        observe: 'response',
      })
      .pipe(
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
              return timer(2000);
            } else {
              return throwError(() => {
                error;
              });
            }
          },
        }),

        catchError((error) => {
          const message: ErrorMessage<T> = { suсcess: false, error: error };
          return throwError(() => {
            message.error;
          });
        })
      );
  }
}
