// LocalStorige is used for saving user phone number in auth

import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorigeService {
  #platformId: Object = inject(PLATFORM_ID);
  #isBrowser: boolean = isPlatformBrowser(this.#platformId);

  sendToLocalStorige(data: string) {
    console.log('storige service get data', data);

    if (this.#isBrowser) {
      try {
        localStorage.setItem('user', data);
      } catch {
        return;
      }
    }
  }

  getLocalStorige(): string {
    if (this.#isBrowser) {
      try {
        return localStorage.getItem('user') ?? '';
      } catch (error) {
        console.log(error);

        return '';
      }
    }
    return '';
  }

  constructor() {}
}
