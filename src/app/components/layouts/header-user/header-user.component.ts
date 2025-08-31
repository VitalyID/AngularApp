import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorigeService } from '../../../services/local-storige.service';
import { PopupService } from '../../../services/popup.service';
import { ButtonsComponent } from '../../../shared/components/buttons/buttons.component';
import { DropdownComponent } from '../../../shared/components/dropdown/dropdown.component';
import { ListDropdown } from '../../../shared/components/dropdown/types/interface/listDropdown';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';
import { GetUserInfo } from '../../../state/user/user.action';
import { StateUser } from '../../../state/user/user.models';
import { UserState } from '../../../state/user/user.state';
import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import { SvgSpriteSetting } from './../../../types/interfaces/svgIcon';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [
    SvgIconComponent,
    CommonModule,
    DropdownComponent,
    ButtonsComponent,
  ],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss',
})
export class HeaderUserComponent implements AfterViewInit {
  defaultValue: ListDropdown = {
    id: uuidv4(),
    item: 'RU',
    width: '24px',
    height: '20px',
  };

  languageItems: ListDropdown[] = [
    {
      icon: { iconID: 'icon-flag', width: '24px', height: '20px' },
      id: uuidv4(),
      item: 'RU',
    },
    {
      icon: { iconID: 'us-flag', width: '24px', height: '20px' },
      id: uuidv4(),
      item: 'EN',
    },
  ];

  userSetting: SvgSpriteSetting = {
    iconID: 'icon-user',
    width: '44px',
    height: '44px',
    fill: 'red',
  };

  dropdownIcon: SvgSpriteSetting = {
    iconID: 'icon-Arrow-down',
    width: '24px',
    height: '24px',
  };

  exitBtn: ButtonConfig = {
    text: 'Выход',
    background: 'none',
    borderStyle: 'none',
    borderRadius: '0px',
  };

  isOpen = signal<boolean>(false);

  readonly #localeStorageService = inject(LocalStorigeService);
  readonly #router = inject(Router);
  readonly #store = inject(Store);
  readonly #popupService = inject(PopupService);
  readonly #destroyRef = inject(DestroyRef);

  user = signal<Partial<StateUser>>({});

  ngAfterViewInit(): void {
    this.#popupService.popupState$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((popup) => {
        if (popup.name === 'registrationUser' && popup.state) return;

        // NOTE: download user first and last name only if its old user
        this.#store.dispatch(new GetUserInfo());
        const downloadUser$ = this.#store.select(UserState.getUserInfo);
        if (!downloadUser$) return;
        downloadUser$
          .pipe(takeUntilDestroyed(this.#destroyRef))
          .subscribe((user) => this.user.set(user));
      });
  }

  onClickContact() {
    this.isOpen.update((value) => !value);
  }

  exitUser() {
    this.#localeStorageService.getLocalStorige();
    this.#router.navigate(['user-auth']);
  }
}
