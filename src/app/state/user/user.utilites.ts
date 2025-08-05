import { UpdateUserInfo, UserCard } from './user.models';

export function IsUserCard(card: UpdateUserInfo): card is UserCard {
  return (
    (card as UserCard).card !== undefined &&
    typeof (card as UserCard).card === 'object' &&
    (card as UserCard).card.card_number !== undefined &&
    (card as UserCard).card.cvc !== undefined &&
    (card as UserCard).card.expiry !== undefined
  );
}
