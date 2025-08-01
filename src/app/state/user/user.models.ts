import { TypeUser } from '../../shared/components/custom-radio-button/types/enum/typeUser';

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
  card: {
    card_number: string;
    expiry: string;
    cvc: string;
  };
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
}

export type UpdateUserInfo = UserPersonalInfo | UserType | UserCard;

export interface StateUserModel {
  userProfile: StateUser;
}
