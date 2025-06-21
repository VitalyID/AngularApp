import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import * as uuid from 'uuid';
import { link } from '../const';
import { CardsMeta } from '../shared/components/pagination/interface/PaginationMeta';
import { UserCard } from './../state/cards.state';
import { LoadingSpinnerService } from './loading.spinner.service';

@Injectable({ providedIn: 'root' })
export class CardService {
  #http = inject(HttpClient);
  #loadingSpinner = inject(LoadingSpinnerService);

  getCard(page: number, limit: number): Observable<CardsMeta> {
    // const cardID = uuid.v4();
    // this.#loadingSpinner.addTask(cardID);
    const params = new HttpParams().set('limit', limit).set('offset', page);
    return this.#http.get<CardsMeta>(link, { params });
    // .pipe(
    //   finalize(() => {
    //     this.#loadingSpinner.removeTask(cardID);
    //   })
    // );
  }

  postCard(card: UserCard): Observable<UserCard> {
    // type newCard = Omit<UserCard, 'id'>
    const { id, ...noIdUser } = card;
    console.log(noIdUser);
    return this.#http.post<UserCard>(link, noIdUser);
  }

  deleteCard(id: number): Observable<UserCard> {
    return this.#http.delete<UserCard>(`${link}/${id}`);
  }

  putCard(idCard: number, card: UserCard) {
    const { id, ...noIdUser } = card;
    return this.#http.put(`${link}/${idCard}`, noIdUser);
  }
}
