import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { defaultDropDown } from '../../../const';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SvgSpriteSetting } from './../../../types/interfaces/svgIcon';
import { ListDropdown } from './types/interface/listDropdown';

@Component({
  selector: 'dropdown',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DropdownComponent),
    },
  ],
  imports: [SvgIconComponent, CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent
  implements ControlValueAccessor, OnChanges, OnInit
{
  @Input() dropdownItems: ListDropdown[] = [];
  @Input() defaultValue: ListDropdown = defaultDropDown;
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

  isOpen: boolean = false;
  disabled: boolean = false;
  modeDropdown: boolean = false;

  // NOTE: work on a situation, when some value is checked by default.
  ngOnInit(): void {
    if (this.defaultValue.item !== defaultDropDown.item) {
      this.itemSelected.emit(this.defaultValue);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultValue']) {
      if (this.modeDropdown === true) return;
    }
  }

  onClick() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    this.onTouched();
  }

  onClickItem(data: ListDropdown) {
    this.defaultValue = {
      ...this.defaultValue,
      item: data.item,
      icon: data.icon,
      width: data.icon?.width,
      height: data.icon?.height,
    };

    this.isOpen = false;

    return this.modeDropdown
      ? this.onChange(data)
      : this.itemSelected.emit(data);
  }

  writeValue(data: ListDropdown) {
    if (this.modeDropdown) {
      this.defaultValue = data || { id: '', item: '' };
      this.defaultValue = { ...this.defaultValue };
    }
    return;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
    this.modeDropdown = true;
    if (this.defaultValue.item !== defaultDropDown.item) {
      this.onChange(this.defaultValue);
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
    this.modeDropdown = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (data: ListDropdown) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
