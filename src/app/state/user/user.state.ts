import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { take } from 'rxjs';
import { UserInfoService } from '../../services/userInfo.service';
import { AddUser } from './user.action';
import { StateUserModel } from './user.models';

@State<StateUserModel>({
  name: 'userProfile',
  defaults: {
    userProfile: {
      first_name: '',
      last_name: '',
      email: '',
      country: '',
      city: '',
      client_type: 'Payer',
      card: {
        card_number: '',
        expiry: '',
        cvc: '',
      },
    },
  },
})
@Injectable()
export class UserState {
  readonly #http = inject(UserInfoService);

  @Selector()
  static getUserInfo(state: StateUserModel) {
    return state.userProfile;
  }

  @Action(AddUser)
  AddUser(ctx: StateContext<StateUserModel>, { info }: AddUser) {
    const oldUser = ctx.getState().userProfile;
    ctx.patchState({ userProfile: { ...oldUser, ...info } });
    return this.#http.postUserInfo(ctx.getState());
  }
}
