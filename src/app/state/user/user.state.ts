import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { take } from 'rxjs';
import { UserInfoService } from '../../services/userInfo.service';
import { TypeUser } from '../../shared/components/custom-radio-button/types/enum/typeUser';
import { AddUser } from './user.action';

export interface UserPersonalInfo {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  city: string;
}

export interface UserType {
  client_type: keyof typeof TypeUser;
}

export interface UserCard {
  card: {
    card_number: string;
    expiry: string;
    cvc: string;
  };
}

export interface StateUser {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  city: string;
  client_type: keyof typeof TypeUser;
  card: {
    card_number: string;
    expiry: string;
    cvc: string;
  };
}

export type UpdateUserInfo = UserPersonalInfo | UserType | UserCard;

export interface StateUserModel {
  userProfile: StateUser;
}

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
    this.#http.postUserInfo(ctx.getState()).pipe(take(1));
  }
}
