import { UpdateUserInfo } from './user.models';

export class AddUser {
  static readonly type = '[user] Add User';
  constructor(public info: UpdateUserInfo) {}
}
