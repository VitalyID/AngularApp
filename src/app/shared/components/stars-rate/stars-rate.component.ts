import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { AddUserStarRate } from '../../../components/QR-CodeCreator/state/qr-code-creator.action';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { DataStarRate } from './types/interface/dataToStarRate';

@Component({
  selector: 'stars-rate',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './stars-rate.component.html',
  styleUrl: './stars-rate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// implements ControlValueAccessor, OnInit, OnChanges
export class StarsRateComponent {
  @Input() starRateSetup: DataStarRate = {
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
  readonly #store = inject(Store);

  ngOnInit(): void {
    this.general = Array(this.maxCounter).fill(0);
    this.isDisable = this.starRateSetup.disabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataFromParent']) {
      this.userClick = this.starRateSetup.rate;
    }
  }

  setDisabledState(data: boolean) {
    this.isDisable = data;
    this.userClick = this.starRateSetup.rate;
  }

  onClick(data: number) {
    this.userClick = data;

    this.tmp = data;
    this.#cdr.markForCheck();
    this.#cdr.detectChanges();

    // =====================
    // == Подкдючаем стор ==
    // =====================

    this.#store.dispatch(new AddUserStarRate(data));
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
