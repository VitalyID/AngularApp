import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { parseTemplate } from 'url-template';
import { link } from '../const';
import { CardsMeta } from '../shared/components/pagination/interface/PaginationMeta';
import { UserCard } from './../state/cards.state';

@Injectable({ providedIn: 'root' })
export class CardService {
  #http = inject(HttpClient);

  getCard(page = 0): Observable<CardsMeta> {
    const params = new HttpParams().set('limit', 12).set('offset', page);
    return this.#http.get<CardsMeta>(link, { params });
  }

  postCard(card: UserCard): Observable<UserCard> {
    console.log('send: ', card);

    return this.#http.post<UserCard>(link, card);
  }

  deleteCard(id: number): Observable<UserCard> {
    const templateId = parseTemplate('/{qr_id}');
    const actualURL = templateId.expand({ qr_id: `${id}` });
    return this.#http.delete<UserCard>(link + actualURL);
  }

  putCard(id: number, card: UserCard) {
    const templateId = parseTemplate('/{qr_id}');
    const actualURL = templateId.expand({ qr_id: `${id}` });
    return this.#http.put(link + actualURL, card);
  }
}
