import { Type } from '@angular/core';
import { TypeUser } from '../../shared/components/custom-radio-button/types/enum/typeUser';

// NOTE: in this interfaces property 'currentComponent' need for user.state.ts where logic is controlling component, which call dispatch. Before send to serve, this property is removing

export interface UserPersonalInfo {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  city: string;
  currentComponent?: Type<any>;
}

export interface UserType {
  client_type: keyof typeof TypeUser;
  currentComponent?: Type<any>;
}

export interface UserCard {
  card: {
    card_number: string;
    expiry: string;
    cvc: string;
  };
  currentComponent?: Type<any>;
}

export interface StateUser {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  city: string;
  client_type: keyof typeof TypeUser;
  card: {
    card_number: string;
    expiry: string;
    cvc: string;
  };
  currentComponent?: Type<any>;
}

export type UpdateUserInfo = UserPersonalInfo | UserType | UserCard;

export interface StateUserModel {
  userProfile: StateUser;
}
