import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { profileLink } from '../const';
import { StateUserModel } from '../state/user/user.state';

@Injectable({ providedIn: 'root' })
export class UserInfoService {
  readonly #http = inject(HttpClient);

  postUserInfo(user: StateUserModel) {
    return this.#http.post<StateUserModel>(profileLink, user);
  }
}
