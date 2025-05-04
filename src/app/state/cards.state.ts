// import { Cards } from './cards.state';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UpdateCards } from './cards.action';

export interface Cards {
  cards: UserCard[];
  activeCard: UserCard;
}

export interface UserCard {
  background_hex_color: string;
  business_payment_type: string;
  button_hex_color: string;
  commission_coverage: boolean;
  employee_display: boolean;
  id: number;
  logo_file_id: string | null;
  platform_id: string;
  preset_payment_sizes: [];
  qr_image: string;
  rating: boolean;
  reviews: boolean;
  smiles: boolean;
}

const defaultValue: Cards = {
  cards: [
    {
      background_hex_color: '#eeeff2',
      business_payment_type: '',
      button_hex_color: '#eeeff2',
      commission_coverage: false,
      employee_display: false,
      id: 1,
      logo_file_id: null,
      platform_id: '',
      preset_payment_sizes: [],
      qr_image: '',
      rating: false,
      reviews: false,
      smiles: false,
    },
  ],
  activeCard: {
    background_hex_color: '#eeeff2',
    business_payment_type: '',
    button_hex_color: '#eeeff2',
    commission_coverage: false,
    employee_display: false,
    id: 1,
    logo_file_id: null,
    platform_id: '',
    preset_payment_sizes: [],
    qr_image: '',
    rating: false,
    reviews: false,
    smiles: false,
  },
};

@State<Cards>({
  name: 'cards',
  defaults: defaultValue,
})
@Injectable()
export class ListOfCards {
  @Selector()
  static getCards(state: Cards) {
    return state;
  }

  @Action(UpdateCards)
  UpdateCards(ctx: StateContext<Cards>, { cards, active }: UpdateCards) {
    const data = ctx.getState();
    console.log(data);
    ctx.patchState({
      cards: cards,
      activeCard: active,
    });

    console.log(1, cards);
    console.log(2, active);
  }
}
