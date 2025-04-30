import { HttpClient } from '@angular/common/http';

import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetDataQrService {
  readonly #http = inject(HttpClient);
  link: string = 'https://tips-aarout.amvera.io/qr-codes';
  link2: string =
    'https://gist.githubusercontent.com/VitalyID/dc4db55479320e040e9c4e3f123bcad1/raw/bfea1e0afb851f6222173a358b0f4a923f88576b/gistfile1.txt';

  getQR() {
    console.log(1111111);

    return this.#http.get(this.link2);
  }

  constructor() {}
}
