import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { EMPTY, take, tap } from 'rxjs';
import { UserInfoService } from '../../services/userInfo.service';
import { RegistrationTypeComponent } from '../../shared/components/registration-type/registration-type.component';
import { RegistrationFormComponent } from '../../shared/components/restration-form/registration-form.component';
import { GetUserInfo, UpdateUser } from './user.action';
import { StateUser, StateUserModel } from './user.models';

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
      cards: [
        {
          card_number: '1234123412341234',
          expiry: '12/12',
          cvc: '123',
          isActive: false,
        },
      ],
    },
  },
})
@Injectable()
export class UserState {
  readonly #http = inject(UserInfoService);

  @Selector()
  static getUserInfo(state: StateUserModel): StateUser {
    return {
      ...state.userProfile,
    };
  }

  @Action(UpdateUser)
  updateUser(
    ctx: StateContext<StateUserModel>,
    { info, isNewUser }: UpdateUser,
  ) {
    const oldUser = ctx.getState().userProfile;

    ctx.patchState({ userProfile: { ...oldUser, ...info } });

    if (
      info.currentComponent === RegistrationFormComponent ||
      info.currentComponent === RegistrationTypeComponent
    )
      return EMPTY;

    const { currentComponent, ...updateUserInfo } = ctx.getState().userProfile;

    return isNewUser
      ? this.#http.putUserInfo(updateUserInfo)
      : this.#http.postUserInfo(updateUserInfo);
  }

  @Action(GetUserInfo)
  getUserInfo(ctx: StateContext<StateUserModel>) {
    return this.#http.getUserService().pipe(
      take(1),
      tap((userInfo: StateUser) => {
        if (typeof userInfo.cards === 'string') {
          const parseCards = JSON.parse(userInfo.cards);
          userInfo = { ...userInfo, cards: parseCards };
        }

        ctx.patchState({
          userProfile: userInfo,
        });
      }),
    );
  }
}
