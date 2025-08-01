import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { GeneratorListCountryCityService } from '../../services/generator-list-country-city.service';
import { ListDropdown } from '../../shared/components/dropdown/types/interface/listDropdown';
import { ListOfService } from '../../const';
import { UserInfoService } from '../../services/userInfo.service';
import { Store } from '@ngxs/store';
import { UserInfo } from '../../types/interfaces/userInfo';
import { UserState } from '../../state/user/user.state';

@Component({
  selector: 'personal-data',
  standalone: false,
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalDataComponent implements OnInit {
  name: string = 'Введите имя';
  surName: string = 'Введите фамилию';
  email: string = 'Введите e-mail';
  tel: string = 'Введите телефон';

  readonly #dropdownService = inject(GeneratorListCountryCityService);
  readonly #store = inject(Store);

  listCountries$: Observable<ListDropdown[]> =
    this.#dropdownService.dropdownUserCountry$;

  listCities$: Observable<ListDropdown[]> =
    this.#dropdownService.dropdownUserCities$;

  userInfo: Signal<UserInfo> = this.#store.selectSignal(UserState.getUserInfo);

  ngOnInit(): void {
    this.#dropdownService.userCountry(Object.keys(ListOfService)[0]);
  }
}
