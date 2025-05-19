import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';
import { DeleteCard } from '../../../state/cards.action';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { ButtonData } from '../../../types/sectionItem';
import { ButtonsComponent } from '../buttons/buttons.component';

@Component({
  selector: 'qr-card',
  imports: [SvgIconComponent, CommonModule, ButtonsComponent],
  templateUrl: './qr-card.component.html',
  styleUrl: './qr-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCardComponent {
  @Input({ required: true }) src: string = '';
  @Input({ required: true }) backgroundCard: string = '';
  @Input({ required: true }) btnColor: string = '#ffffff';
  @Input({ required: true }) id: number = 0;

  readonly #store = inject(Store);

  svgSetting: SvgSpriteSetting = {
    iconID: 'Path',
    width: '10px',
    height: '20px',
    fill: 'black',
  };

  walletBTN = computed<ButtonData>(() => ({
    text: 'Добавить в Apple Wallet',
    background: this.btnColor,
    borderStyle: 'none',
    id: 24,
  }));

  chartIcon: ButtonData = {
    text: '',
    iconClass: 'icon-Chart',
    background: 'none',
    borderStyle: 'none',
    // color: 'black',
    id: 25,
  };

  shareIcon: ButtonData = {
    text: '',
    iconClass: 'icon-share',
    background: 'none',
    borderStyle: 'none',
    id: 26,
  };

  editIcon: ButtonData = {
    text: '',
    iconClass: 'icon-Edit',
    background: 'none',
    borderStyle: 'none',
    id: 27,
  };

  deleteIcon: ButtonData = {
    text: '',
    iconClass: 'icon-Trash',
    background: 'none',
    borderStyle: 'none',
    id: 28,
  };

  deleteCard(id: number) {
    this.#store.dispatch(new DeleteCard(id));
  }
}
