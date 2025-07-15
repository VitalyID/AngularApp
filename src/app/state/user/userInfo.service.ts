import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../../types/interfaces/userInfo';

@Injectable({ providedIn: 'root' })
export class UserInfoService {
  userProfile = new BehaviorSubject<UserInfo>({
    userName: '',
    userLastName: '',
    email: '',
    country: '',
    city: '',
  });

  // NOTE: control-test
  user = this.userProfile.subscribe((user) => {
    console.log('DEBUG:', user);
  });
}
