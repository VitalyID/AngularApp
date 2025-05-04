import { UserCard } from './cards.state';

export class UpdateCards {
  static readonly type = '[Cards] SetCards';
  constructor(public cards: UserCard[], public active: UserCard) {}
}
