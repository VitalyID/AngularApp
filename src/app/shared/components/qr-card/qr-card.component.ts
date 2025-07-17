import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { loremIpsum } from 'lorem-ipsum';
import * as uuid from 'uuid';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';
import { DeleteCard, EditCard } from '../../../state/cards/cards.action';
import { ListOfCards } from '../../../state/cards/cards.state';
import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { ButtonsComponent } from '../buttons/buttons.component';

@Component({
  selector: 'qr-card',
  imports: [SvgIconComponent, CommonModule, ButtonsComponent, RouterModule],
  templateUrl: './qr-card.component.html',
  styleUrl: './qr-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCardComponent implements OnInit {
  @Input({ required: true }) src: string = '';
  @Input({ required: true }) backgroundCard: string = '';
  @Input({ required: true }) btnColor: string = '#ffffff';
  @Input({ required: true }) id: number = 0;

  readonly #store = inject(Store);
  readonly #router = inject(Router);

  cards = this.#store.selectSignal(ListOfCards.getCards)().cards;

  currentCard = computed(() => this.cards.find((card) => card.id === this.id));

  svgSetting: SvgSpriteSetting = {
    iconID: 'Path',
    width: '10px',
    height: '20px',
    fill: 'black',
  };

  walletBTN = computed<ButtonConfig>(() => ({
    text: 'Добавить в Apple Wallet',
    background: this.btnColor,
    borderStyle: 'none',
  }));

  chartIcon: ButtonConfig = {
    iconClass: 'icon-Chart',
    background: 'none',
    borderStyle: 'none',
    id: uuid.v4(),
  };

  shareIcon: ButtonConfig = {
    iconClass: 'icon-share',
    background: 'none',
    borderStyle: 'none',
    id: uuid.v4(),
  };

  editIcon: ButtonConfig = {
    iconClass: 'icon-Edit',
    background: 'none',
    borderStyle: 'none',
    id: uuid.v4(),
  };

  deleteIcon: ButtonConfig = {
    iconClass: 'icon-Trash',
    background: 'none',
    borderStyle: 'none',
    id: uuid.v4(),
  };

  ngOnInit(): void {
    const lorem = this.randomText();
    const baseUrl = 'http://api.qrserver.com/v1/create-qr-code/?data=';
    const size = '&size=150x150';
    this.src = `${baseUrl}${lorem}${size}`;
  }

  randomText(): string {
    const range = Math.floor(Math.random() * 10) + 1;
    return loremIpsum({ count: range });
  }

  deleteCard(id: number) {
    this.#store.dispatch(new DeleteCard(id));
  }

  editCard(id: number) {
    const EDIT_CARD = this.currentCard();

    if (EDIT_CARD && EDIT_CARD.id === id) {
      this.#store.dispatch(new EditCard(EDIT_CARD));
      this.#router.navigate(['/create-qrcode', id]);
    }
  }
}
