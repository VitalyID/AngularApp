import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorigeService {
  #platformId: object = inject(PLATFORM_ID);
  #isBrowser: boolean = isPlatformBrowser(this.#platformId);

  sendToLocalStorige(data: string) {

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
        console.log('DEBUG', error);

        return '';
      }
    }
    return '';
  }

}
