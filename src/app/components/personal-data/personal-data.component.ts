import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ListOfService } from '../../const';
import { GeneratorListCountryCityService } from '../../services/generator-list-country-city.service';
import { ListDropdown } from '../../shared/components/dropdown/types/interface/listDropdown';
import { UpdateUser } from '../../state/user/user.action';
import { UserState } from '../../state/user/user.state';
import { UserInfo } from '../../types/interfaces/userInfo';

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

  btnText = computed(() =>
    this.isTypePage() ? 'Создать сотрудника' : 'Редактировать сотрудника',
  );

  readonly #dropdownService = inject(GeneratorListCountryCityService);
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  listCountries$: Observable<ListDropdown[]> =
    this.#dropdownService.dropdownUserCountry$;

  listCities$: Observable<ListDropdown[]> =
    this.#dropdownService.dropdownUserCities$;

  userInfo: Signal<UserInfo> = this.#store.selectSignal(UserState.getUserInfo);

  // NOTE: check type page: edit or create if user hasn't filled in the form fields
  isTypePage = computed(() => {
    if (
      this.userInfo().first_name &&
      this.userInfo().last_name &&
      this.userInfo().email
    )
      return true;
    return false;
  });

  ngOnInit(): void {
    this.#dropdownService.userCountry(Object.keys(ListOfService)[0]);

    const route = this.isTypePage() ? 'edit' : 'create';
    this.#router.navigate(['personal-data', route]);
  }

  sendUserInfo() {
    return this.isTypePage()
      ? this.#store.dispatch(new UpdateUser(this.userInfo(), true))
      : this.#store.dispatch(new UpdateUser(this.userInfo()));
  }
}
