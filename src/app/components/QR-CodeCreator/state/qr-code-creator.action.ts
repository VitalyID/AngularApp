// import { UserSetTipModel } from './qr-code-creator.state';

export class AddUploadLogo {
  static readonly type = '[UploadLogo] SetUploadLogo';
  constructor(public userLogo: string) {}
}

// export class AddUserTips {
//   static readonly type = '[inputTip] SetInputTip';
//   constructor(public userTip: UserSetTipModel) {}
// }
