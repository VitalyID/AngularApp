import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { EMPTY } from 'rxjs';
import { UserInfoService } from '../../services/userInfo.service';
import { UpdateUser } from './user.action';
import { StateUserModel } from './user.models';
import { IsUserCard } from './user.utilites';

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

  @Action(UpdateUser)
  updateUser(
    ctx: StateContext<StateUserModel>,
    { info, isNewUser }: UpdateUser,
  ) {
    console.log('debug state start:', info, isNewUser);

    const oldUser = ctx.getState().userProfile;
    ctx.patchState({ userProfile: { ...oldUser, ...info } });

    // NOTE: if info last component from stepper - send data to server
    if (!IsUserCard(info)) {
      return EMPTY;
    }

    console.log('debug: state', ctx.getState().userProfile);

    return isNewUser
      ? this.#http.putUserInfo(ctx.getState().userProfile)
      : this.#http.postUserInfo(ctx.getState().userProfile);
  }
}
