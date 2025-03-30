import { InputUsersModel } from './qr-code-creator.state';

export class AddUploadLogo {
  static readonly type = '[UploadLogo] SetUploadLogo';
  constructor(public userLogo: string) {}
}

export class AddUserTips {
  static readonly type = '[inputTip] SetInputTip';
  constructor(public userTip: InputUsersModel) {}
}

export class AddUserStarRate {
  static readonly type = '[SetRate] SetStatRate';
  constructor(public userRate: number) {}
}

export class AddUserFeedback {
  static readonly type = '[SetFeedback] SetMyFeedBack';
  constructor(public userFeedback: string) {}
}

export class AddUserAmodzie {
  static readonly type = '[SetAmodzie] SetUserAmodzie';
  constructor(public userAmodzie: number) {}
}

export class AddUserSubstrateColor {
  static readonly type = '[SetSubstrate] SetSubstrateColor';
  constructor(public userSubstrateColor: string) {}
}

export class AddUserBTNcolor {
  static readonly type = '[SetBTN] SetBtnColor';
  constructor(public userBTNcolor: string) {}
}
