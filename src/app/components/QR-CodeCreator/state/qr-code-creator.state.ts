import { Action, Selector, State, StateContext } from '@ngxs/store';
// import { StarRateModel, btnColor } from './qr-code-creator.state';
import { Injectable } from '@angular/core';
import {
  AddUserAmodzie,
  AddUserBTNcolor,
  AddUserFeedback,
  AddUserStarRate,
  AddUserSubstrateColor,
  AddUserTips,
} from './qr-code-creator.action';
// import { Injectable } from '@angular/core';
// import { Action, Selector, State, StateContext } from '@ngxs/store';
// import { LogoProfileDefaultSource } from '../../../types/enums/logoProfile';
// import { InputUsers } from './../types/interface/inputUsers';
// import {
//   AddUploadLogo,
//   AddUserAmodzie,
//   AddUserBTNcolor,
//   AddUserFeedback,
//   AddUserStarRate,
//   AddUserSubstrateColor,
//   AddUserTips,
// } from './qr-code-creator.action';

// export interface InputUsersModel {
//   'inputID-1': number;
//   'inputID-2': number;
//   'inputID-3': number;
// }

// export interface StarRateModel {
//   rate: number;
//   disabled: boolean;
// }

// export interface userFeedbackModel {
//   text: string;
//   readonly: boolean;
// }

// export interface AmodzieModel {
//   rate: number;
//   readonly: boolean;
// }

// export interface SubstrateModel {
//   color: string;
// }

// export interface btnColorModel {
//   color: string;
// }

// ======================================================

// export interface UploadLogoModel {
//   logo: string;
// }

// // ===================================================
// // ===================================================
// // ===================================================

// const inputTips: InputUsersModel = {
//   'inputID-1': 100,
//   'inputID-2': 150,
//   'inputID-3': 200,
// };

// const userStar: StarRateModel = {
//   rate: 2,
//   disabled: false,
// };
// const userFeedback: userFeedbackModel = {
//   text: 'bla-bla-bla',
//   readonly: true,
// };
// const defaultAmodzie: AmodzieModel = {
//   rate: 3,
//   readonly: true,
// };
// const userSubstrateColor: SubstrateModel = {
//   color: '#eeeff2',
// };
// const userDefaultLogo: UploadLogoModel = {
//   logo: LogoProfileDefaultSource.logoSource,
// };
// const defaultBtnColor: btnColorModel = { color: '#eeeff2' };

// // ===================================================
// // ===================================================
// // ===================================================

// @State<InputUsersModel>({
//   name: 'setTip',
//   defaults: inputTips,
// })
// @Injectable()
// export class SetUserTips {
//   @Selector()
//   static getUserTips(state: InputUsers) {
//     console.log(state);
//     return state;
//   }

//   @Action(AddUserTips)
//   AddUserTips(ctx: StateContext<InputUsersModel>, action: AddUserTips) {
//     const stateUserTip = ctx.getState();
//     console.log('стор получил tip юзер: ', stateUserTip);
//     ctx.setState({ ...stateUserTip, ...action.userTip });
//   }
// }

// // =================================

// @State<StarRateModel>({
//   name: 'rate',
//   defaults: userStar,
// })
// @Injectable()
// export class SetUserStarRate {
//   @Selector()
//   static getUserStarRate(state: StarRateModel) {
//     return state;
//   }

//   @Action(AddUserStarRate)
//   AddUserStarRate(
//     ctx: StateContext<StarRateModel>,
//     { userRate }: AddUserStarRate
//   ) {
//     const stateRate = ctx.getState();
//     console.log('stars: ', stateRate);
//     ctx.setState({ rate: userRate, disabled: false });
//   }
// }

// // =================================

// @State<userFeedbackModel>({
//   name: 'feedbackText',
//   defaults: userFeedback,
// })
// @Injectable()
// export class userFeedbackState {
//   @Selector()
//   static getMyFeedback(state: userFeedbackModel) {
//     return state;
//   }

//   @Action(AddUserFeedback)
//   AddUserFeedback(
//     ctx: StateContext<userFeedbackModel>,
//     { userFeedback }: AddUserFeedback
//   ) {
//     const text = ctx.getState();
//     console.log('text: ', text);
//     ctx.setState({ text: userFeedback, readonly: true });
//   }
// }

// // =================================

// @State<AmodzieModel>({
//   name: 'amodzie',
//   defaults: defaultAmodzie,
// })
// @Injectable()
// export class AmodzieState {
//   @Selector()
//   static getAmodzieState(state: AmodzieModel) {
//     return state;
//   }

//   @Action(AddUserAmodzie)
//   AddUserAmodzie(
//     ctx: StateContext<AmodzieModel>,
//     { userAmodzie }: AddUserAmodzie
//   ) {
//     const state = ctx.getState();
//     console.log('Amodzie: ', state);
//     ctx.setState({ rate: userAmodzie, readonly: true });
//   }
// }

// // =================================

// @State<SubstrateModel>({
//   name: 'userColor',
//   defaults: userSubstrateColor,
// })
// @Injectable()
// export class SubstrateColor {
//   @Selector()
//   static getColorSubstrate(state: SubstrateModel) {
//     return state.color;
//   }

//   @Action(AddUserSubstrateColor)
//   AddUserSubstrateColor(
//     ctx: StateContext<SubstrateModel>,
//     { userSubstrateColor }: AddUserSubstrateColor
//   ) {
//     const color = ctx.getState();
//     console.log('Цвет подложки: ', color);
//     ctx.setState({ color: userSubstrateColor });
//   }
// }

// // =================================

// @State<btnColorModel>({
//   name: 'userColor',
//   defaults: defaultBtnColor,
// })
// @Injectable()
// export class btnColor {
//   @Selector()
//   static getColorSubstrate(state: btnColorModel) {
//     return state.color;
//   }

//   @Action(AddUserBTNcolor)
//   AddUserBTNcolor(
//     ctx: StateContext<btnColorModel>,
//     { userBTNcolor }: AddUserBTNcolor
//   ) {
//     const color = ctx.getState();
//     console.log('Цвет подложки: ', color);
//     ctx.setState({ color: userBTNcolor });
//   }
// }

// // =================================

// @State<UploadLogoModel>({
//   name: 'userlogo',
//   defaults: userDefaultLogo,
// })
// @Injectable()
// export class UploadLogoState {
//   @Selector()
//   static getUploadLogo(state: UploadLogoModel) {
//     return state.logo;
//   }

//   @Action(AddUploadLogo)
//   AddUploadLogo(
//     ctx: StateContext<UploadLogoModel>,
//     { userLogo }: AddUploadLogo
//   ) {
//     const stateUploadLogo = ctx.getState();
//     console.log('стор получил лого юзер: ', stateUploadLogo);
//     ctx.setState({ logo: userLogo });
//   }
// }

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

export interface CreateCodeModel {
  tips: InputUsers;
  star: StarRate;
  feedback: UserFeedback;
  amodzie: UserAmodzie;
  substrate: SubstrateColor;
  btnColor: BTNcolor;
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
}
