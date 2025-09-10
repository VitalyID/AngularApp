import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as uuid from 'uuid';
import { isString } from '../components/personal-data/utils/narrow-dropdown-types';
import { ListOfService } from '../const';
import { ListDropdown } from '../shared/components/dropdown/types/interface/listDropdown';

@Injectable({
  providedIn: 'root',
})
export class GeneratorListCountryCityService {
  dropdownUserCountry$ = new BehaviorSubject<ListDropdown[]>([
    { id: '', item: '' },
  ]);
  dropdownUserCities$ = new BehaviorSubject<ListDropdown[]>([
    { id: '', item: '' },
  ]);
  dropdownDefCountry$ = new BehaviorSubject<ListDropdown>({ id: '', item: '' });

  setCountry(country?: string): ListDropdown[] {
    const countries = Object.keys(ListOfService).sort();
    const newListCountries = countries.map((country) => ({
      id: uuid.v4(),
      item: country,
    }));
    this.dropdownUserCountry$.next(newListCountries);

    const defaultCountry = country
      ? newListCountries.filter((item) => {
          return item.item === country;
        })[0]
      : newListCountries[0];

    this.dropdownDefCountry$.next(defaultCountry);
    return newListCountries;
  }

  setCities(defaultCountry: ListDropdown | string): ListDropdown[] {
    const resultType = isString(defaultCountry);

    const cities = resultType
      ? ListOfService[defaultCountry] || []
      : ListOfService[defaultCountry.item ?? ''] || [];

    const userCity = cities.map((city) => ({ id: uuid.v4(), item: city }));
    this.dropdownUserCities$.next(userCity);
    return userCity;
  }

  // NOTE: click user on dropdown country
  // NOTE: type 'string' its data from serever
  userCountry(country: ListDropdown | string) {
    this.setCities(country);
  }

  constructor() {
    const userCountry = this.setCountry();
    this.setCities(userCountry[0]);
  }
}
