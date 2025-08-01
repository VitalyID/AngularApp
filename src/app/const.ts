import { ListDropdown } from './shared/components/dropdown/types/interface/listDropdown';

export const link = 'https://tips-aarout.amvera.io/qr-codes';
export const auth = 'https://tips-aarout.amvera.io';
export const profileLink = 'https://tips-aarout.amvera.io/profile';

export const urlForAuth = ['https://tips-aarout.amvera.io'];

export const ListOfService: Record<string, string[]> = {
  Россия: ['Москва', 'Санкт-Петербург', 'Орел'],
  USA: ['Нью-Йорк', 'Лос-Анджелес', 'Чикаго'],
  Germany: ['Берлин', 'Мюнхен', 'Гамбург'],
};

export const defaultDropDown: ListDropdown = {
  id: '',
  item: 'Необходимо выбрать',
};
