import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import * as uuid from 'uuid';
import { link } from '../const';
import { CardsMeta } from '../shared/components/pagination/interface/PaginationMeta';
import { UserCard } from './../state/cards.state';

@Injectable({ providedIn: 'root' })
export class CardService {
  #http = inject(HttpClient);
  // #loadingSpinner = inject(LoadingSpinnerService);

  getCard(page: number, limit: number): Observable<CardsMeta> {
    const params = new HttpParams().set('limit', limit).set('offset', page);
    return this.#http.get<CardsMeta>(link, { params });
  }

  postCard(card: UserCard): Observable<UserCard> {
    const { id, ...noIdUser } = card;
    return this.#http.post<UserCard>(link, noIdUser);
  }

  deleteCard(id: number): Observable<void> {
    return this.#http.delete<void>(`${link}/${id}`);
  }

  putCard(idCard: number, card: UserCard): Observable<UserCard> {
    const { id, ...noIdUser } = card;
    return this.#http.put<UserCard>(`${link}/${idCard}`, noIdUser);
  }
}
