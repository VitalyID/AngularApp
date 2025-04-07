import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LogoProfileDefaultSource } from '../../../types/enums/logoProfile';
import {
  AddUploadLogo,
  AddUserAmodzie,
  AddUserColor,
  AddUserFeedback,
  AddUserStarRate,
  AddUserTips,
} from './qr-code-creator.action';

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

export interface CreateCodeModel {
  tips: InputUsers;
  star: StarRate;
  feedback: UserFeedback;
  amodzie: UserAmodzie;
  color: Color;
  logo: UploadLogo;
}

const defaultData: CreateCodeModel = {
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
};

@State<CreateCodeModel>({
  name: 'setTip',
  defaults: defaultData,
})
@Injectable()
export class CreateQRcodeState {
  @Selector()
  static getUserTips(state: CreateCodeModel) {
    return state.tips;
  }

  @Selector()
  static getUserStarRate(state: CreateCodeModel) {
    return state.star;
  }

  @Selector()
  static getMyFeedback(state: CreateCodeModel) {
    return state.feedback;
  }

  @Selector()
  static getAmodzieState(state: CreateCodeModel) {
    return state.amodzie;
  }

  @Selector()
  static getColor(state: CreateCodeModel) {
    console.log('color:', state.color);

    return state.color;
  }

  @Selector()
  static getUploadLogo(state: CreateCodeModel) {
    return state.logo.logo;
  }

  // -------------
  // -- @Action --
  // -------------

  @Action(AddUserTips)
  AddUserTips(ctx: StateContext<CreateCodeModel>, action: AddUserTips) {
    ctx.patchState({
      tips: {
        ...ctx.getState().tips,
        ...action.userTip,
      },
    });
  }

  @Action(AddUserStarRate)
  AddUserStarRate(
    ctx: StateContext<CreateCodeModel>,
    { userRate }: AddUserStarRate
  ) {
    ctx.patchState({ star: { rate: userRate, disabled: false } });
  }

  @Action(AddUserFeedback)
  AddUserFeedback(
    ctx: StateContext<CreateCodeModel>,
    { userFeedback }: AddUserFeedback
  ) {
    ctx.patchState({ feedback: { text: userFeedback, readonly: false } });
  }

  @Action(AddUserAmodzie)
  AddUserAmodzie(
    ctx: StateContext<CreateCodeModel>,
    { userAmodzie }: AddUserAmodzie
  ) {
    ctx.patchState({ amodzie: { rate: userAmodzie, readonly: true } });
  }

  @Action(AddUserColor)
  AddUserColor(
    ctx: StateContext<CreateCodeModel>,
    { colorSubstr, colorBTNsubstr }: AddUserColor
  ) {
    console.log('store color ', colorBTNsubstr, colorSubstr);

    ctx.patchState({
      color: { colorBTN: colorSubstr, colorSubstrate: colorBTNsubstr },
    });
  }

  @Action(AddUploadLogo)
  AddUploadLogo(
    ctx: StateContext<CreateCodeModel>,
    { userLogo }: AddUploadLogo
  ) {
    ctx.patchState({ logo: { logo: userLogo } });
  }
}
