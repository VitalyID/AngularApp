import { Injectable } from '@angular/core';
import { UserInfo } from '../../types/interfaces/userInfo';

@Injectable({ providedIn: 'root' })
export class UserInfoService {
  // DEBUG: readonly #http = inject(HttpClient);

  postUserInfo(user: UserInfo) {
    console.log('debug', user);

    // DEBUG: return this.#http.post<UserInfo>(profileLink, user);
  }
}
