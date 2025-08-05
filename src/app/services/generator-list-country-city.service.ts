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

  setCountry() {
    const countries = Object.keys(ListOfService).sort();
    this.dropdownUserCountry$.next(
      countries.map((country) => ({ id: uuid.v4(), item: country })),
    );
  }

  setCities(country: string) {
    const cities = ListOfService[country];
    this.dropdownUserCities$.next(
      cities.map((city) => ({ id: uuid.v4(), item: city })),
    );
  }

  userCountry(country: string) {
    this.setCities(country);
  }

  constructor() {
    this.setCountry();
  }
}
