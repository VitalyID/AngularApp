import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorigeService } from '../../../services/local-storige.service';
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
export class HeaderUserComponent implements OnInit {
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

  user: Signal<StateUser> = this.#store.selectSignal(UserState.getUserInfo);

  ngOnInit(): void {
    this.#store.dispatch(new GetUserInfo());
  }

  onClickContact() {
    this.isOpen.update((value) => !value);
  }

  exitUser() {
    this.#localeStorageService.getLocalStorige();
    this.#router.navigate(['user-auth']);
  }
}
