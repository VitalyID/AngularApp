import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as uuid from 'uuid';
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

  defaultCountry: ListDropdown = { id: '', item: '' };

  setCountry(): ListDropdown[] {
    const countries = Object.keys(ListOfService).sort();
    const newListCountries = countries.map((country) => ({
      id: uuid.v4(),
      item: country,
    }));
    this.dropdownUserCountry$.next(newListCountries);
    this.defaultCountry = newListCountries[0];
    return newListCountries;
  }

  setCities(defaultCountry: ListDropdown): ListDropdown[] {
    const cities = ListOfService[defaultCountry.item];
    const userCity = cities.map((city) => ({ id: uuid.v4(), item: city }));
    this.dropdownUserCities$.next(userCity);
    return userCity;
  }

  // NOTE: click user on dropdown country
  userCountry(country: ListDropdown) {
    this.setCities(country);
  }

  constructor() {
    const userCountry = this.setCountry();
    this.setCities(userCountry[0]);
  }
}
