import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { profileLink } from '../../const';
import { UserInfo } from '../../types/interfaces/userInfo';

@Injectable({ providedIn: 'root' })
export class UserInfoService {
  readonly #http = inject(HttpClient);

  postUserInfo(user: UserInfo) {
    return this.#http.post<UserInfo>(profileLink, user);
  }
}
