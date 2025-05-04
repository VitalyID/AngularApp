import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LogoProfileDefaultSource } from '../../../types/enums/logoProfile';
import {
  AddIdCard,
  AddUploadLogo,
  AddUserAmodzie,
  AddUserColor,
  AddUserFeedback,
  AddUserStarRate,
  AddUserTips,
} from './qr-code-creator.action';
// import { Card } from './qr-code-creator.state';

export interface InputUsers {
  'inputID-1': number;
  'inputID-2': number;
  'inputID-3': number;
}

export interface StarRate {
  rate: number;
  disabled: boolean;
}

export interface UserFeedback {
  text: string;
  readonly: boolean;
}

export interface UserAmodzie {
  rate: number;
  readonly: boolean;
}

export interface Color {
  colorSubstrate: string;
  colorBTN: string;
}

export interface UploadLogo {
  logo: string;
}

export interface Card {
  tips: InputUsers;
  star: StarRate;
  feedback: UserFeedback;
  amodzie: UserAmodzie;
  color: Color;
  logo: UploadLogo;
  id: number;
}

// export interface State {
//   cards: Card[];
//   activeCard: number | null;
// }

const defaultData: Card = {
  tips: {
    'inputID-1': 100,
    'inputID-2': 150,
    'inputID-3': 200,
  },
  star: {
    rate: 2,
    disabled: true,
  },
  feedback: {
    text: 'bla-bla-bla',
    readonly: true,
  },
  amodzie: {
    rate: 3,
    readonly: true,
  },

  color: {
    colorSubstrate: '#eeeff2',
    colorBTN: '#eeeff2',
  },

  logo: {
    logo: LogoProfileDefaultSource.logoSource,
  },

  id: 1,
};

@State<Card>({
  name: 'setTip',
  defaults: defaultData,
})
@Injectable()
export class CreateQRcodeState {
  @Selector()
  static getUserTips(state: Card) {
    return state.tips;
  }

  @Selector()
  static getUserStarRate(state: Card) {
    return state.star;
  }

  @Selector()
  static getMyFeedback(state: Card) {
    return state.feedback;
  }

  @Selector()
  static getAmodzieState(state: Card) {
    return state.amodzie;
  }

  @Selector()
  static getColor(state: Card) {
    return state?.color || defaultData.color;
  }

  @Selector()
  static getUploadLogo(state: Card) {
    return state.logo.logo;
  }

  @Selector()
  static getIdCard(state: Card) {
    return state.id;
  }

  // -------------
  // -- @Action --
  // -------------

  @Action(AddUserTips)
  AddUserTips(ctx: StateContext<Card>, action: AddUserTips) {
    ctx.patchState({
      tips: {
        ...ctx.getState().tips,
        ...action.userTip,
      },
    });
  }

  @Action(AddUserStarRate)
  AddUserStarRate(ctx: StateContext<Card>, { userRate }: AddUserStarRate) {
    ctx.patchState({ star: { rate: userRate, disabled: false } });
  }

  @Action(AddUserFeedback)
  AddUserFeedback(ctx: StateContext<Card>, { userFeedback }: AddUserFeedback) {
    ctx.patchState({ feedback: { text: userFeedback, readonly: false } });
  }

  @Action(AddUserAmodzie)
  AddUserAmodzie(ctx: StateContext<Card>, { userAmodzie }: AddUserAmodzie) {
    ctx.patchState({ amodzie: { rate: userAmodzie, readonly: true } });
  }

  @Action(AddUserColor)
  AddUserColor(
    ctx: StateContext<Card>,
    { colorSubstr, colorBTNsubstr }: AddUserColor
  ) {
    console.log('store color ', colorBTNsubstr, colorSubstr);

    ctx.patchState({
      color: { colorBTN: colorSubstr, colorSubstrate: colorBTNsubstr },
    });
  }

  @Action(AddUploadLogo)
  AddUploadLogo(ctx: StateContext<Card>, { userLogo }: AddUploadLogo) {
    ctx.patchState({ logo: { logo: userLogo } });
  }

  @Action(AddIdCard)
  AddIdCard(ctx: StateContext<Card>, action: AddIdCard) {
    ctx.patchState({ id: action.cardId });
  }
}

// export interface UserCards {
//   background_hex_color: string;
//   business_payment_type: string;
//   button_hex_color: string;
//   commission_coverage: boolean;
//   employee_display: boolean;
//   id: number;
//   logo_file_id: null;
//   platform_id: string;
//   preset_payment_sizes: [];
//   qr_image: string;
//   rating: boolean;
//   reviews: boolean;
//   smiles: boolean;
// }
