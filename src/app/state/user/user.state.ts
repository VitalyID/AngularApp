import { Injectable, WritableSignal } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TypeUser } from '../../shared/components/custom-radio-button/types/enum/typeUser';
import { AddUser } from './user.action';

export interface UserPersonalInfo {
  first_name: WritableSignal<string>;
  last_name: WritableSignal<string>;
  email: WritableSignal<string>;
  country: WritableSignal<string>;
  city: WritableSignal<string>;
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
  user: StateUser;
}

@State<StateUserModel>({
  name: 'user',
  defaults: {
    user: {
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
  @Selector()
  static getUserInfo(state: StateUserModel) {
    return state.user;
  }

  @Action(AddUser)
  AddUser(ctx: StateContext<StateUserModel>, { info }: AddUser) {
    const oldUser = ctx.getState();
    ctx.patchState({
      ...oldUser,
      ...info,
    });

    console.log('debug:', ctx.getState());
  }
}
