import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCard } from '../state/cards.state';

@Injectable({ providedIn: 'root' })
export class PutCardService {
  #http = inject(HttpClient);
  link = 'https://tips-aarout.amvera.io/qr-codes';

  putCards(cards: UserCard[]): Observable<UserCard[]> {
    console.log('отправляем в бэк', cards);
    return this.#http.put<UserCard[]>(this.link, cards);
  }

  constructor() {}
}
