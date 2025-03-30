import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LogoProfileDefaultSource } from '../../../types/enums/logoProfile';
import { InputUsers } from './../types/interface/inputUsers';
import {
  AddUploadLogo,
  AddUserAmodzie,
  AddUserBTNcolor,
  AddUserFeedback,
  AddUserStarRate,
  AddUserSubstrateColor,
  AddUserTips,
} from './qr-code-creator.action';

export interface InputUsersModel {
  'inputID-1': number;
  'inputID-2': number;
  'inputID-3': number;
}

const inputTips: InputUsersModel = {
  'inputID-1': 100,
  'inputID-2': 150,
  'inputID-3': 200,
};

@State<InputUsersModel>({
  name: 'setTip',
  defaults: inputTips,
})
@Injectable()
export class SetUserTips {
  @Selector()
  static getUserTips(state: InputUsers) {
    return state;
  }

  @Action(AddUserTips)
  AddUserTips(ctx: StateContext<InputUsersModel>, action: AddUserTips) {
    const stateUserTip = ctx.getState();
    console.log('стор получил tip юзер: ', stateUserTip);
    ctx.setState({ ...stateUserTip, ...action.userTip });
  }
}

// =================================
// =================================

export interface StarRateModel {
  rate: number;
}

@State<StarRateModel>({
  name: 'rate',
  defaults: {
    rate: 2,
  },
})
@Injectable()
export class SetUserStarRate {
  @Selector()
  static getUserStarRate(state: StarRateModel) {
    return state;
  }

  @Action(AddUserStarRate)
  AddUserStarRate(
    ctx: StateContext<StarRateModel>,
    { userRate }: AddUserStarRate
  ) {
    const stateRate = ctx.getState();
    console.log('stars: ', stateRate);
    ctx.setState({ rate: userRate });
  }
}

// =================================
// =================================

export interface userFeedbackModel {
  text: string;
}

@State<userFeedbackModel>({
  name: 'feedbackText',
  defaults: {
    text: 'bla-bla-bla',
  },
})
@Injectable()
export class userFeedbackState {
  @Selector()
  static getMyFeedback(state: userFeedbackModel) {
    return state;
  }

  @Action(AddUserFeedback)
  AddUserFeedback(
    ctx: StateContext<userFeedbackModel>,
    { userFeedback }: AddUserFeedback
  ) {
    const text = ctx.getState();
    console.log('text: ', text);
    ctx.setState({ text: userFeedback });
  }
}

// =================================
// =================================

export interface AmodzieModel {
  rate: number;
}

@State<AmodzieModel>({
  name: 'amodzie',
  defaults: {
    rate: 3,
  },
})
@Injectable()
export class AmodzieState {
  @Selector()
  static getAmodzieState(state: AmodzieModel) {
    return state;
  }

  @Action(AddUserAmodzie)
  AddUserAmodzie(
    ctx: StateContext<AmodzieModel>,
    { userAmodzie }: AddUserAmodzie
  ) {
    const state = ctx.getState();
    console.log('Amodzie: ', state);
    ctx.setState({ rate: userAmodzie });
  }
}

// =================================
// =================================

export interface SubstrateModel {
  color: string;
}

@State<SubstrateModel>({
  name: 'userColor',
  defaults: {
    color: '#eeeff2',
  },
})
@Injectable()
export class SubstrateColor {
  @Selector()
  static getColorSubstrate(state: SubstrateModel) {
    return state.color;
  }

  @Action(AddUserSubstrateColor)
  AddUserSubstrateColor(
    ctx: StateContext<SubstrateModel>,
    { userSubstrateColor }: AddUserSubstrateColor
  ) {
    const color = ctx.getState();
    console.log('Цвет подложки: ', color);
    ctx.setState({ color: userSubstrateColor });
  }
}

// =================================
// =================================

export interface UploadLogo {
  logo: string;
}

@State<UploadLogo>({
  name: 'userlogo',
  defaults: {
    logo: LogoProfileDefaultSource.logoSource,
  },
})
@Injectable()
export class UploadLogoState {
  @Selector()
  static getUploadLogo(state: UploadLogo) {
    return state.logo;
  }

  @Action(AddUploadLogo)
  AddUploadLogo(ctx: StateContext<UploadLogo>, { userLogo }: AddUploadLogo) {
    const stateUploadLogo = ctx.getState();
    console.log('стор получил лого юзер: ', stateUploadLogo);
    ctx.setState({ logo: userLogo });
  }
}

// =================================
// =================================

export interface btnColorModel {
  color: string;
}

@State<btnColorModel>({
  name: 'userColor',
  defaults: {
    color: '#eeeff2',
  },
})
@Injectable()
export class btnColor {
  @Selector()
  static getColorSubstrate(state: btnColorModel) {
    return state.color;
  }

  @Action(AddUserBTNcolor)
  AddUserBTNcolor(
    ctx: StateContext<btnColorModel>,
    { userBTNcolor }: AddUserBTNcolor
  ) {
    const color = ctx.getState();
    console.log('Цвет подложки: ', color);
    ctx.setState({ color: userBTNcolor });
  }
}
