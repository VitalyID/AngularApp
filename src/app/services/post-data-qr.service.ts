import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCard } from '../state/cards.state';

@Injectable({ providedIn: 'root' })
export class PostCardService {
  #http = inject(HttpClient);
  link = 'https://tips-aarout.amvera.io/qr-codes';

  // post(cards: UserCard) {
  //   console.log('callback in the service', cards);
  // }

  post(cards: UserCard): Observable<UserCard> {
    console.log('отправляем в бэк', cards);
    return this.#http.post<UserCard>(this.link, cards);
  }

  constructor() {}
}
