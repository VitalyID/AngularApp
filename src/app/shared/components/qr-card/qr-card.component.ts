import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { GetDataQrService } from '../../../services/get-data-qr.service';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';
import { UpdateCards } from '../../../state/cards.action';
import { UserCard } from '../../../state/cards.state';
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
export class QrCardComponent implements OnInit {
  @Input({ required: true }) src: string = '';
  @Input({ required: true }) backgroundCard: string = '';
  @Input({ required: true }) btnColor: string = '#ffffff';

  readonly #store = inject(Store);
  readonly #destroyRef = inject(DestroyRef);
  readonly #http = inject(GetDataQrService);

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

  // cardCount: number = 0;
  getCards: UserCard[] = [];

  ngOnInit(): void {
    // console.log(this.#store.snapshot());
    this.#http
      .getQR()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        const keys = Object.keys(data);
        keys.forEach((key) => {
          this.getCards = [...this.getCards, (data as any)[key]];
          // this.getCards.push((data as any)[key]);
        });
        this.#store.dispatch(new UpdateCards(this.getCards, this.getCards[0]));
      });
  }
}
