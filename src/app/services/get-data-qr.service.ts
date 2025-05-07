import { HttpClient } from '@angular/common/http';

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCard } from '../state/cards.state';

@Injectable({
  providedIn: 'root',
})
export class GetDataQrService {
  readonly #http = inject(HttpClient);
  link: string = 'https://tips-aarout.amvera.io/qr-codes';
  link2: string =
    'https://gist.githubusercontent.com/VitalyID/dc4db55479320e040e9c4e3f123bcad1/raw/1781af7af2c4fba48abb96fce6fbd4043750af2a/gistfile1.txt';

  getQR(): Observable<UserCard[]> {
    return this.#http.get<UserCard[]>(this.link);
  }

  constructor() {}
}
