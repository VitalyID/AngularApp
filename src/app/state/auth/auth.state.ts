export interface UserData {
  phone: string;
  password: string;
  token: string;
  userCreated: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface CreateUserResponse {
  phone: '';
  id: number;
  created_at: '';
  updated_at: '';
}
