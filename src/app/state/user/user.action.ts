import { UpdateUserInfo } from './user.models';

export class UpdateUser {
  static readonly type = '[user] User';
  constructor(
    public info: UpdateUserInfo,
    public isNewUser: boolean = false,
  ) {}
}
