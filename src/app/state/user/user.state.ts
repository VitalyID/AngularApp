import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { EMPTY, take, tap } from 'rxjs';
import { UserInfoService } from '../../services/userInfo.service';
import { GetUserInfo, UpdateBankCards, UpdateUser } from './user.action';
import { StateUser, StateUserModel } from './user.models';
import { typeBankCard } from './user.utils';

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

  // NOTE: If user update personal information after some time info:UpdateUserInfo, isNewUser === true;

  @Action(UpdateUser)
  updateUser(
    ctx: StateContext<StateUserModel>,
    { info, isNewUser }: UpdateUser,
  ) {
    const oldUser = ctx.getState().userProfile;
    ctx.patchState({ userProfile: { ...oldUser, ...info } });

    const { cards, ...state } = ctx.getState().userProfile;
    if (!cards.length) return EMPTY;
    if (!Object.values(state).every((value) => value !== null)) return EMPTY;

    return isNewUser
      ? this.#http.putUserInfo(ctx.getState().userProfile)
      : this.#http.postUserInfo(ctx.getState().userProfile);
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

        console.log('debug before: ', userInfo);

        const cardsWithLogo = userInfo.cards.map((card) => {
          return (card.typeCard = typeBankCard());
        });

        console.log('debug cards after: ', cardsWithLogo);

        ctx.patchState({
          userProfile: userInfo,
        });
      }),
    );
  }

  @Action(UpdateBankCards)
  updateCards(ctx: StateContext<StateUserModel>, { cards }: UpdateBankCards) {
    const oldUserInfo = ctx.getState().userProfile;

    ctx.patchState({
      userProfile: { ...oldUserInfo, cards: [...cards] },
    });

    return this.#http.putUserInfo(ctx.getState().userProfile);
  }
}
