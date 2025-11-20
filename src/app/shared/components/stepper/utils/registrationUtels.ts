import {
  UpdateUserInfo,
  UserCard,
  UserPersonalInfo,
  UserType,
} from '../../../../state/user/user.models';

export function isUserPersonalInfo(
  object: UpdateUserInfo,
): object is UserPersonalInfo {
  return (
    object &&
    'first_name' in object &&
    'last_name' in object &&
    'email' in object &&
    'country' in object &&
    'city' in object
  );
}

export function isUserType(object: UpdateUserInfo): object is UserType {
  return object && 'client_type' in object;
}

export function isUserCard(object: UpdateUserInfo): object is UserCard {
  return object && 'cards' in object;
}
