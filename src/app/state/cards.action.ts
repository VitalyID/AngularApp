import { UserCard, UserData } from './cards.state';

export default class UpdateCards {
  static readonly type = '[Cards] SetCards';
  constructor(public rangeCards: number) {}
}

export class UpdateEditCard {
  static readonly type = '[editCard] SetNewCard';
  constructor(public newValue: { [key: string]: any }) {}
}

export class PostCard {
  static readonly type = '[postCard] postUserCard';
  constructor(public newCard: UserCard) {}
}

export class DeleteCard {
  static readonly type = '[deletecard] deleteCurrentCard';
  constructor(public id: number) {}
}

export class EditCard {
  static readonly type = '[editCard] editCurrentCard';
  constructor(public userCard: UserCard) {}
}

export class PutCard {
  static readonly type = '[putCard] putUserCard';
  constructor(public userCard: UserCard) {}
}

export class AuthUser {
  static readonly type = '[AuthData] authUserPhone';
  constructor(public user: UserData) {}
}

export class RegisterUser {
  static readonly type = '[AuthData] authUserPhone';
  constructor(public user: UserData) {}
}

export class LoginUser {
  static readonly type = '[AuthData] LoginPhone';
  constructor(public user: UserData) {}
}
