import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';
import { DeleteCard, EditCard } from '../../../state/cards.action';
import { ListOfCards } from '../../../state/cards.state';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { ButtonData } from '../../../types/sectionItem';
import { ButtonsComponent } from '../buttons/buttons.component';

@Component({
  selector: 'qr-card',
  imports: [SvgIconComponent, CommonModule, ButtonsComponent, RouterModule],
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
  readonly #router = inject(Router);

  store$ = toSignal(this.#store.select(ListOfCards.getCards), {
    initialValue: {
      cards: [],
      userCard: {
        background_hex_color: '#E7E9F0',
        business_payment_type: 'TIPS',
        button_hex_color: '#3FA949',
        commission_coverage: false,
        employee_display: true,
        id: 0,
        logo_file_id: '../../assets/images/logoDefault.png',
        platform_id: '',
        preset_payment_sizes: [100, 250, 500],
        qr_image: '',
        rating: false,
        reviews: false,
        smiles: false,
      },
      error: null,
    },
  });

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

  editCard(id: number) {
    const actualCard = this.store$().cards.find((card) => {
      return card.id === id;
    });

    if (!actualCard) return;
    this.#store.dispatch(new EditCard(actualCard));

    this.#router.navigate(['/create-qrcode']);
  }
}
