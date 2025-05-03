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
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CreateQRcodeState } from '../../../components/QR-CodeCreator/state/qr-code-creator.state';
import { GetDataQrService } from '../../../services/get-data-qr.service';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';
import { SvgSpriteSetting } from '../../../types/interfaces/svgIcon';
import { ButtonData } from '../../../types/sectionItem';
import { ButtonsComponent } from '../buttons/buttons.component';
import { Color } from './../../../components/QR-CodeCreator/state/qr-code-creator.state';

@Component({
  selector: 'qr-card',
  imports: [SvgIconComponent, CommonModule, ButtonsComponent],
  templateUrl: './qr-card.component.html',
  styleUrl: './qr-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCardComponent implements OnInit {
  @Input({ required: true }) src: string = '';

  // readonly #qrService = inject(QRcodeService);
  readonly #store = inject(Store);
  readonly #destroyRef = inject(DestroyRef);

  // backgroundColor = signal('');

  svgSetting: SvgSpriteSetting = {
    iconID: 'Path',
    width: '10px',
    height: '20px',
    fill: 'black',
  };

  walletBTN = computed<ButtonData>(() => ({
    text: 'Добавить в Apple Wallet',
    background: this.backgroundColor()?.colorBTN.toString(),
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

  cardCount: number = 0;
  cardColor: string[] = [];
  btnColor: string[] = [];
  imageQr: string[] = [];

  userColor$: Observable<Color> = this.#store.select(
    CreateQRcodeState.getColor
  );

  readonly backgroundColor = toSignal(this.userColor$);
  readonly #http = inject(GetDataQrService);

  ngOnInit(): void {
    // this.userColor$.subscribe((color) =>
    //   console.log('Color from store:', color)
    // );

    this.#http
      .getQR()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        console.log('data from server^', data);
        this.cardCount = Object.keys(data).length;

        console.log('tap: ', data);
        const keys = Object.keys(data);
        keys.forEach((key) => {
          this.cardColor.push((data as any)[key].background_hex_color);
          this.btnColor.push((data as any)[key].button_hex_color);
          this.imageQr.push((data as any)[key].qr_image);

          console.log(this.cardColor);
          console.log(this.btnColor);
          console.log(this.imageQr);
        });
      });
  }
}
