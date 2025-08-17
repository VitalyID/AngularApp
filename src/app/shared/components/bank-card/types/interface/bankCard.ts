import { Signal } from '@angular/core';

export interface UserBankCard {
  typeBankCard: Signal<string>;
  balansCard: Signal<number>;
  nameCardHolder: Signal<string>;
  numberCard: Signal<string>;
  expirationDate: Signal<string>;
}
