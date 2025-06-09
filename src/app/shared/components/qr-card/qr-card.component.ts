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
export class QrCardComponent implements OnInit {
  @Input({ required: true }) src: string = '';
  @Input({ required: true }) backgroundCard: string = '';
  @Input({ required: true }) btnColor: string = '#ffffff';
  @Input({ required: true }) id: number = 0;

  readonly #store = inject(Store);
  readonly #router = inject(Router);

  store = this.#store.selectSignal(ListOfCards.getCards);

  currentCard = computed(() =>
    this.store().cards.find((e) => {
      return e.id === this.id;
    })
  );

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
    id: uuid.v4(),
  }));

  chartIcon: ButtonData = {
    text: '',
    iconClass: 'icon-Chart',
    background: 'none',
    borderStyle: 'none',
    // color: 'black',
    id: uuid.v4(),
  };

  shareIcon: ButtonData = {
    text: '',
    iconClass: 'icon-share',
    background: 'none',
    borderStyle: 'none',
    id: uuid.v4(),
  };

  editIcon: ButtonData = {
    text: '',
    iconClass: 'icon-Edit',
    background: 'none',
    borderStyle: 'none',
    id: uuid.v4(),
  };

  deleteIcon: ButtonData = {
    text: '',
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
    const range = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
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
