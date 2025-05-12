import { UserCard } from './cards.state';

export default class UpdateCards {
  static readonly type = '[Cards] SetCards';
  constructor() {}
}

export class UpdateEditCard {
  static readonly type = '[editCard] SetNewCard';
  constructor(public newCard: UserCard) {}
}
