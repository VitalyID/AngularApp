export interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  city: string;
  client_type?: string;
  card?: { card_number: string; expiry: string; cvc: string };
}
