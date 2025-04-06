import { Action, Selector, State, StateContext } from '@ngxs/store';
// import { StarRateModel, btnColor } from './qr-code-creator.state';
import { Injectable } from '@angular/core';
import { LogoProfileDefaultSource } from '../../../types/enums/logoProfile';
import {
  AddUploadLogo,
  AddUserAmodzie,
  AddUserBTNcolor,
  AddUserFeedback,
  AddUserStarRate,
  AddUserSubstrateColor,
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

export interface SubstrateColor {
  color: string;
}

export interface BTNcolor {
  color: string;
}

export interface UploadLogo {
  logo: string;
}

export interface CreateCodeModel {
  tips: InputUsers;
  star: StarRate;
  feedback: UserFeedback;
  amodzie: UserAmodzie;
  substrate: SubstrateColor;
  btnColor: BTNcolor;
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

  substrate: { color: '#eeeff2' },
  btnColor: { color: '#eeeff2' },
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
  static getColorBTN(state: CreateCodeModel) {
    return state.substrate;
  }

  @Selector()
  static getColorSubstrate(state: CreateCodeModel) {
    return state.btnColor;
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

  AddUserSubstrateColor(
    ctx: StateContext<CreateCodeModel>,
    { userSubstrateColor }: AddUserSubstrateColor
  ) {
    ctx.patchState({ substrate: { color: userSubstrateColor } });
  }

  @Action(AddUserBTNcolor)
  AddUserBTNcolor(
    ctx: StateContext<CreateCodeModel>,
    { userBTNcolor }: AddUserBTNcolor
  ) {
    ctx.patchState({ btnColor: { color: userBTNcolor } });
  }

  @Action(AddUploadLogo)
  AddUploadLogo(
    ctx: StateContext<CreateCodeModel>,
    { userLogo }: AddUploadLogo
  ) {
    ctx.patchState({ logo: { logo: userLogo } });
  }
}
