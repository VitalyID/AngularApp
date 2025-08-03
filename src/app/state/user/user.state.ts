import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserInfoService } from '../../services/userInfo.service';
import { AddUser } from './user.action';
import { IsUserCard } from './user.utilites';
import { StateUserModel } from './user.models';
import { EMPTY } from 'rxjs';

@State<StateUserModel>({
  name: 'userProfile',
  defaults: {
    userProfile: {
      first_name: '',
      last_name: '',
      email: '',
      country: '',
      city: '',
      client_type: 'payer',
      card: {
        card_number: '1234123412341234',
        expiry: '12/12',
        cvc: '123',
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

    if (IsUserCard(info)) {
      return this.#http.postUserInfo(ctx.getState().userProfile);
    }
    return EMPTY;
  }
}
