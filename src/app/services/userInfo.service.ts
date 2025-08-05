import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { profileLink } from '../const';
import { StateUser, StateUserModel } from '../state/user/user.models';

@Injectable({ providedIn: 'root' })
export class UserInfoService {
  readonly #http = inject(HttpClient);

  postUserInfo(user: StateUser) {
    return this.#http.post<StateUser>(profileLink, user);
  }
}
