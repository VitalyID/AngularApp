import { UserCard } from './cards.state';

export default class UpdateCards {
  static readonly type = '[Cards] SetCards';
  constructor() {}
}

export class UpdateEditCard {
  static readonly type = '[editCard] SetNewCard';
  constructor(public newCard: UserCard) {}
}

export class PostCard {
  static readonly type = '[postCard] postUserCard';
  constructor(public newCard: UserCard) {}
}
