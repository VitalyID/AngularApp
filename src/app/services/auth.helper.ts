import { AuthResponse, CreateUserResponse } from '../state/cards.state';

export function isCreateUserResponse(data: any): data is CreateUserResponse {
  return (
    data !== null &&
    typeof data.phone === 'string' &&
    typeof data.id === 'number' &&
    typeof data.created_at === 'string' &&
    typeof data.updated_at === 'string'
  );
}

export function isAuthResponse(data: any): data is AuthResponse {
  return (
    data !== null &&
    typeof data.access_token === 'string' &&
    typeof data.token_type === 'string'
  );
}
