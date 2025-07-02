import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SvgSpriteSetting } from './../../../types/interfaces/svgIcon';
import { ListDropdown } from './types/interface/listDropdown';

@Component({
  selector: 'dropdown',
  imports: [SvgIconComponent, CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  @Input() dropdownItems: ListDropdown[] = [];
  @Input() defaultValue: ListDropdown = {
    id: '',
    item: '',
  };
  @Output() itemSelected = new EventEmitter();

  DropdownOpenIcon: SvgSpriteSetting = {
    iconID: 'icon-Arrow-down',
    width: '24px',
    height: '24px',
  };

  svgSetting: SvgSpriteSetting = {
    iconID: '',
    width: '',
    height: '',
  };
  svgSettingActive: SvgSpriteSetting = {
    iconID: '',
    width: '',
    height: '',
  };
  spanActive: string = 'Необходимо выбрать';

  isOpen : boolean = false;

  onClick() {
    this.isOpen = !this.isOpen;
  }

  onClickItem(data: ListDropdown) {
    this.spanActive = data.item;
    if (data.icon) {
      this.svgSettingActive = data.icon;
    }
    this.isOpen = false;
    this.itemSelected.emit(data);
  }
}
