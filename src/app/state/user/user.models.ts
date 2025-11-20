import { Type } from '@angular/core';
import { TypeUser } from '../../shared/components/custom-radio-button/types/enum/typeUser';

// NOTE: in this interfaces property 'currentComponent' need for user.state.ts where logic is controlling component, which call dispatch. Before send to serve, this property is removing

export interface UserPersonalInfo {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  city: string;
}

export interface UserType {
  client_type: keyof typeof TypeUser;
}

export interface UserCard {
  cards: BankCard[];
}

export interface StateUser {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  city: string;
  client_type: keyof typeof TypeUser;
  cards: BankCard[];
}

export type UpdateUserInfo = UserPersonalInfo | UserType | UserCard;

export interface StateUserModel {
  userProfile: StateUser;
}

export interface BankCard {
  card_number: string;
  expiry: string;
  cvc: string;
  typeCard?: string;
  isActive: boolean;
}
