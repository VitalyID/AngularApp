import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { profileLink } from '../const';
import { StateUser } from '../state/user/user.models';

@Injectable({ providedIn: 'root' })
export class UserInfoService {
  readonly #http = inject(HttpClient);

  postUserInfo(user: StateUser) {
    console.log('debug: send to service', user);

    return this.#http.post<StateUser>(profileLink, user);
  }

  putUserInfo(user: StateUser) {
    console.log('debug: send to service', user);

    return this.#http.put<StateUser>(profileLink, user);
  }

  getUserService() {
    return this.#http.get<StateUser>(profileLink).pipe(
      tap((response) => {
        console.log('debug service get: ', response);
      }),
    );
  }
}
