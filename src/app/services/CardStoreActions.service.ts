import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { link } from '../const';
import { CardsMeta } from '../shared/components/pagination/interface/PaginationMeta';
import { UserCard } from './../state/cards.state';

@Injectable({ providedIn: 'root' })
export class CardService {
  #http = inject(HttpClient);

  getCard(page: number, limit: number): Observable<CardsMeta> {
    const params = new HttpParams().set('limit', limit).set('offset', page);
    return this.#http.get<CardsMeta>(link, { params });
  }

  postCard(card: UserCard): Observable<UserCard> {
    return this.#http.post<UserCard>(link, card);
  }

  deleteCard(id: number): Observable<UserCard> {
    return this.#http.delete<UserCard>(`${link}/${id}`);
  }

  putCard(id: number, card: UserCard) {
    return this.#http.put(`${link}/${id}`, card);
  }
}
