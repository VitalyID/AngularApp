import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

    switch (request) {
      case RequestServer.delete:
        argument = argument as number;
        url = this.newUrl(argument);
        break;
      case RequestServer.put:
        argument = argument as UserCard;
        break;
      case RequestServer.post:
        argument = argument as UserCard;
        break;
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
    return this.#http.request<UserCard[] | void>(request, this.link, {
      body: argument,
    });
  }
}
