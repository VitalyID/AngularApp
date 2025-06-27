import { UserCard } from '../../../../state/cards/cards.state';

export interface PaginationMeta {
  limit: number;
  total: number;
  offset: number;
}

export interface CardsMeta {
  data: UserCard[];
  pagination: PaginationMeta;
}
