import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { DataStarRate } from './types/interface/dataToStarRate';

@Component({
  selector: 'stars-rate',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './stars-rate.component.html',
  styleUrl: './stars-rate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarsRateComponent),
      multi: true,
    },
  ],
})
export class StarsRateComponent
  implements ControlValueAccessor, OnInit, OnChanges
{
  @Input() dataFromParent: DataStarRate = {
    disabled: false,
    rate: 0,
  };

  svgSetting: SvgSpriteSetting = {
    iconID: 'star',
    width: '40px',
    height: '38px',
  };

  general: number[] = [];
  maxCounter: number = 5;

  isDisable: boolean = false;
  userClick: number = 0;
  onTouch: number = 0;
  tmp: number = 0;

  readonly #cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.general = Array(this.maxCounter).fill(0);
    this.isDisable = this.dataFromParent.disabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataFromParent']) {
      this.userClick = this.dataFromParent.rate;
    }
  }

  #onTouched = () => {};
  #onChange = (value: number) => {};

  registerOnTouched(fn: any): void {
    this.#onTouched = fn;
  }

  onBlur() {
    this.#onTouched();
  }

  writeValue(value: number): void {
    this.userClick = value;
    this.onTouch = 0;
  }

  registerOnChange(fn: any): void {
    this.#onChange(fn);
  }

  setDisabledState(data: boolean) {
    this.isDisable = data;
    this.userClick = this.dataFromParent.rate; // save status rate? when is disabled
    this.onTouch = this.dataFromParent.rate;
  }

  onClick(data: number) {
    this.userClick = data;

    this.tmp = data;
    this.#onChange(this.userClick);
    this.#cdr.markForCheck();
    this.#cdr.detectChanges();
    console.log(data);

    // ===========================
    // == Подкдючаем стор здесь ==
    // ===========================
  }

  onMouseOver(data: number) {
    this.userClick = 0;
    this.onTouch = data;
  }

  onMouseLeave() {
    this.userClick = this.tmp;
    this.onTouch = 0;

    this.#cdr.markForCheck();
  }
}
