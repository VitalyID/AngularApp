import { BankCard, UpdateUserInfo } from './user.models';

export class UpdateUser {
  static readonly type = '[user] User';
  constructor(
    public info: UpdateUserInfo,
    public isNewUser: boolean = false,
  ) {}
}

export class GetUserInfo {
  static readonly type = '[getInfo] GetInfoUser';
}

export class UpdateBankCards {
  static readonly type = '[bankCards] UserBankCards';
  constructor(public cards: BankCard[]) {}
}
