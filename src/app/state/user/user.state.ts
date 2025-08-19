import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { EMPTY, take, tap } from 'rxjs';
import { UserInfoService } from '../../services/userInfo.service';
import { RegistrationTypeComponent } from '../../shared/components/registration-type/registration-type.component';
import { RegistrationFormComponent } from '../../shared/components/restration-form/registration-form.component';
import { GetUserInfo, UpdateBankCards, UpdateUser } from './user.action';
import { StateUser, StateUserModel, UpdateUserInfo } from './user.models';

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

  stoppingAction(user: UpdateUserInfo): boolean {
    if (
      user.currentComponent === RegistrationFormComponent ||
      user.currentComponent === RegistrationTypeComponent
    )
      return true;
    return false;
  }

  @Selector()
  static getUserInfo(state: StateUserModel): StateUser {
    return {
      ...state.userProfile,
    };
  }

  // NOTE: If user update personal information after some time info:UpdateUserInfo, isNewUser === true;

  @Action(UpdateUser)
  updateUser(
    ctx: StateContext<StateUserModel>,
    { info, isNewUser }: UpdateUser,
  ) {
    const oldUser = ctx.getState().userProfile;
    ctx.patchState({ userProfile: { ...oldUser, ...info } });

    if (this.stoppingAction(info)) return EMPTY;

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

          console.log('debug: ', userInfo);
        }

        ctx.patchState({
          userProfile: userInfo,
        });
      }),
    );
  }

  @Action(UpdateBankCards)
  updateCards(ctx: StateContext<StateUserModel>, { card }: UpdateBankCards) {
    const oldUserInfo = ctx.getState().userProfile;

    if (this.stoppingAction(oldUserInfo)) return EMPTY;

    ctx.patchState({
      userProfile: { ...oldUserInfo, cards: [...oldUserInfo.cards, card] },
    });

    console.log('debug: store new cards', ctx.getState().userProfile);

    const { currentComponent, ...updateUserInfo } = ctx.getState().userProfile;

    return this.#http.putUserInfo(updateUserInfo);
  }
}
