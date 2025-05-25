import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { parseTemplate } from 'url-template';
import { UserCard } from './../state/cards.state';

@Injectable({ providedIn: 'root' })
export class CardService {
  link = 'https://tips-aarout.amvera.io/qr-codes';

  #http = inject(HttpClient);

  getCard(): Observable<UserCard[]> {
    return this.#http.get<UserCard[]>(this.link);
  }

  postCard(card: UserCard): Observable<UserCard> {
    return this.#http.post<UserCard>(this.link, card);
  }

  deleteCard(id: number): Observable<UserCard> {
    const templateId = parseTemplate('/{qr_id}');
    // const idCard = { qr_id: `${id}` };
    const actualURL = templateId.expand({ qr_id: `${id}` });
    return this.#http.delete<UserCard>(this.link + actualURL);
  }

  putCard(card: UserCard): Observable<UserCard> {
    return this.#http.put<UserCard>(this.link, card);
  }
}
