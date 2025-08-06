import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { profileLink } from '../const';
import { StateUser } from '../state/user/user.models';

@Injectable({ providedIn: 'root' })
export class UserInfoService {
  readonly #http = inject(HttpClient);

  postUserInfo(user: StateUser) {
    console.log('debug: post-request', user);

    return this.#http.post<StateUser>(profileLink, user);
  }

  putUserInfo(user: StateUser) {
    console.log('debug: put-request', user);

    return this.#http.put<StateUser>(profileLink, user);
  }
}
