import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorigeService } from '../../../services/local-storige.service';
import { ButtonsComponent } from '../../../shared/components/buttons/buttons.component';
import { DropdownComponent } from '../../../shared/components/dropdown/dropdown.component';
import { ListDropdown } from '../../../shared/components/dropdown/types/interface/listDropdown';
import { LanguageComponent } from '../../../shared/components/language/language.component';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';
import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import { SvgSpriteSetting } from './../../../types/interfaces/svgIcon';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [
    SvgIconComponent,
    // LanguageComponent,
    CommonModule,
    DropdownComponent,
    LanguageComponent,
    ButtonsComponent,
  ],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss',
})
export class HeaderUserComponent {
  defaultValue: ListDropdown = {
    id: uuidv4(),
    item: 'RU',
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

  onClickContact() {
    this.isOpen.update((value) => !value);
  }

  exitUser() {
    this.#localeStorageService.getLocalStorige();
    this.#router.navigate(['user-auth']);
  }
}
