import { UserAuthData } from './auth.state';

export class LoginUser {
  static readonly type = '[AuthData] Login';
  constructor(public user: UserAuthData) {}
}

export class CreateUser {
  static readonly type = '[AuthData] Register';
  constructor(public user: UserAuthData) {}
}

export class RefreshToken {
  static readonly type = '[Token] refreshToken';
}
