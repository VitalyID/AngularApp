import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { DropdownComponent } from '../../../shared/components/dropdown/dropdown.component';
import { ListDropdown } from '../../../shared/components/dropdown/types/interface/listDropdown';
import { LanguageComponent } from '../../../shared/components/language/language.component';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';
import { SvgSpriteSetting } from './../../../types/interfaces/svgIcon';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [
    SvgIconComponent,
    LanguageComponent,
    CommonModule,
    DropdownComponent,
    DropdownComponent,
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

  isOpen: boolean = false;

  onClickContact() {
    console.log('click on contact');
    this.isOpen = !this.isOpen;
  }
}
