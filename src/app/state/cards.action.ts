import { UserCard } from './cards.state';

export default class UpdateCards {
  static readonly type = '[Cards] SetCards';
  constructor() {}
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

export class ErrorServer {
  static readonly type = '[error message] saveMessage';
  constructor(public message: string) {}
}
