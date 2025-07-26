import { UpdateUserInfo } from './user.state';

export class AddUser {
  static readonly type = '[user] Add User';
  constructor(public info: UpdateUserInfo) {}
}
