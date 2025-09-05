import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Injector,
  OnInit,
  runInInjectionContext,
  Signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GeneratorListCountryCityService } from '../../services/generator-list-country-city.service';
import { LocalStorigeService } from '../../services/local-storige.service';
import { ListDropdown } from '../../shared/components/dropdown/types/interface/listDropdown';
import { GetUserInfo, UpdateUser } from '../../state/user/user.action';
import { UserPersonalInfo } from '../../state/user/user.models';
import { UserState } from '../../state/user/user.state';
import { UserInfo } from '../../types/interfaces/userInfo';
import {
  UserAuthState,
  UserAuthStateModel,
} from './../../state/auth/auth.state';

@Component({
  selector: 'personal-data',
  standalone: false,
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalDataComponent implements OnInit {
  placeName: string = 'Введите имя';
  placeSurName: string = 'Введите фамилию';
  placeEmail: string = 'Введите e-mail';
  placeTel: string = 'Введите телефон';

  newUserInfo: UserPersonalInfo = {
    first_name: '',
    last_name: '',
    email: '',
    country: '',
    city: '',
  };

  btnText = computed(() =>
    this.isEditMode() ? 'Редактировать сотрудника' : 'Создать сотрудника',
  );

  readonly #dropdownService = inject(GeneratorListCountryCityService);
  readonly #store = inject(Store);
  readonly #router = inject(Router);
  readonly #lss = inject(LocalStorigeService);
  readonly #inject = inject(Injector);

  listCountries$: Observable<ListDropdown[]> =
    this.#dropdownService.dropdownUserCountry$;

  listCities$: Observable<ListDropdown[]> =
    this.#dropdownService.dropdownUserCities$;

  userTel$: Observable<UserAuthStateModel> = this.#store.select(
    UserAuthState.userAccount,
  );

  defCountry$: Observable<ListDropdown> =
    this.#dropdownService.dropdownDefCountry$;

  userInfo: Signal<UserInfo> = this.#store.selectSignal(UserState.getUserInfo);

  // NOTE: check type page: edit or create if user hasn't filled in the form fields
  isEditMode = computed(() => {
    return !!(
      this.userInfo().first_name &&
      this.userInfo().last_name &&
      this.userInfo().email
    );
  });

  ngOnInit(): void {
    this.#store.dispatch(new GetUserInfo());
    this.changeUrlPage();

    runInInjectionContext(this.#inject, () => {
      effect(() => {
        this.#dropdownService.setCountry(this.userInfo().country);
        this.#dropdownService.userCountry(this.userInfo().country);
      });
    });
  }

  updatedUserInfo(personalInfo: string, fieldName: string) {
    this.newUserInfo = { ...this.newUserInfo, [fieldName]: personalInfo };
  }

  userCountry(userCountry: ListDropdown) {
    this.newUserInfo = {
      ...this.newUserInfo,
      country: userCountry.item.toString(),
    };
    this.#dropdownService.userCountry(userCountry);
  }

  userCity(userCity: ListDropdown) {
    this.newUserInfo = {
      ...this.newUserInfo,
      city: userCity.item.toString(),
    };
  }

  sendUserInfo() {
    return this.isEditMode()
      ? this.#store.dispatch(new UpdateUser(this.newUserInfo, true))
      : this.#store.dispatch(new UpdateUser(this.newUserInfo));
  }

  userTel() {
    const userData: any = this.#lss.getLocalStorige();
    return JSON.parse(userData).phone;
  }

  changeUrlPage() {
    const route = this.isEditMode() ? 'edit' : 'create';
    this.#router.navigate(['personal-data', route]);
  }
}
