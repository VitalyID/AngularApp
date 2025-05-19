import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCard } from '../state/cards.state';
// import * as template from 'url-template';
// import {expand} from 'url-template';
import { parseTemplate } from 'url-template';

@Injectable({ providedIn: 'root' })
export class PostCardService {
  #http = inject(HttpClient);
  link = 'https://tips-aarout.amvera.io/qr-codes';

  post(cards: UserCard): Observable<UserCard> {
    console.log('отправляем в бэк', cards);
    return this.#http.post<UserCard>(this.link, cards);
  }

  delete(id: number): Observable<UserCard> {
    console.log('удаляем: ', id);

    const templateId = parseTemplate('/{qr_id}');
    const idCard = { qr_id: `${id}` };
    const actualURL = templateId.expand(idCard);

    return this.#http.delete<UserCard>(this.link + actualURL);
  }

  constructor() {}
}
