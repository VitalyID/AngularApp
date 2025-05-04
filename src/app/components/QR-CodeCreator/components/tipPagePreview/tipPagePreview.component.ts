import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AmodzieComponent } from '../../../../shared/components/amodzie/amodzie.component';
import { AmodzieData } from '../../../../shared/components/amodzie/types/interfaces/amodzieStateData';
import { BordeerLineComponent } from '../../../../shared/components/bordeer-line/border-line.component';
import { ButtonsComponent } from '../../../../shared/components/buttons/buttons.component';
import { ButtonService } from '../../../../shared/components/buttons/service/buttons.component.service';
import { FeedbacksComponent } from '../../../../shared/components/feedbacks/feedbacks.component';
import { FeedbackData } from '../../../../shared/components/feedbacks/types/interfces/feedback';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { DataInput } from '../../../../shared/components/input-text/types/interfaces/dataInput';
import { StarsRateComponent } from '../../../../shared/components/stars-rate/stars-rate.component';
import { DataStarRate } from '../../../../shared/components/stars-rate/types/interface/dataToStarRate';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { SwitcherStateService } from '../../../../shared/components/switcher/service/switch.service';
import { SwitcherData } from '../../../../shared/components/switcher/types/interface/switcherDataTransmit';
import { ListOfCards } from '../../../../state/cards.state';
import { LogoProfileDefaultSource } from '../../../../types/enums/logoProfile';
import { SvgSpriteSetting } from '../../../../types/interfaces/svgIcon';
import { ButtonData } from '../../../../types/sectionItem';
import { EnumSwitcher } from './../../../../shared/components/switcher/types/enum/enumSwitcher';
import { Cards } from './../../../../state/cards.state';
// import { SetUserStarRate } from './../../state/qr-code-creator.state';

@Component({
  selector: 'user-preview',
  imports: [
    SvgIconComponent,
    InputTextComponent,
    StarsRateComponent,
    CommonModule,
    FeedbacksComponent,
    AmodzieComponent,
    ButtonsComponent,
    BordeerLineComponent,
  ],
  templateUrl: './tipPagePreview.component.html',
  styleUrl: './tipPagePreview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreviewComponent implements OnInit {
  @ViewChild('preview') previewIMG!: ElementRef;

  logoSource = LogoProfileDefaultSource.logoSource;

  svgLogo: SvgSpriteSetting = {
    iconID: 'Logo',
    height: '40px',
    width: '200px',
  };

  setUpTips: DataInput = {
    placeholder: 'от 100 до 600',
    // inputID: 'inputID-4',
    validation: true,
    unitCurrency: 'rub',
    value: '',
    type: 'number',
    disabled: true,
  };

  arrBTN: ButtonData[] = [
    {
      text: '0 ₽',
      background: '#EEEFF2',
      color: '#313436',
      id: 8,
      borderStyle: 'none',
      key: 'inputID-1',
    },
    {
      text: '0 ₽',
      background: '#EEEFF2',
      color: '#313436',
      id: 9,
      borderStyle: 'none',
      key: 'inputID-2',
    },
    {
      text: '0 ₽',
      background: '#EEEFF2',
      color: '#313436',
      id: 10,
      borderStyle: 'none',
      key: 'inputID-3',
    },
  ];

  btnSendData: ButtonData = {
    text: 'Поблагодарить',
    disabled: true,
    background: '#8f8f8f',
    color: 'black',
    id: 11,
  };

  dataToStarRate: DataStarRate = {
    disabled: false,
    rate: 0,
  };

  feedbackText: FeedbackData = {
    text: '',
    readonly: false,
  };

  amodzieData: AmodzieData = { rate: 0, readonly: false };

  userSettingData: any = {};
  isOpen = signal<boolean>(false);
  isFeedbackOpen = signal<boolean>(false);
  isAmodzieOpen = signal<boolean>(false);
  isActive: number = 0;

  readonly #destroyRef = inject(DestroyRef);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #btnService = inject(ButtonService);
  readonly #switcherService = inject(SwitcherStateService);
  readonly #store = inject(Store);

  // userFeedback$: Observable<UserFeedback> = this.#store.select(
  //   CreateQRcodeState.getMyFeedback
  // );
  // userAmodzieStore$: Observable<UserAmodzie> = this.#store.select(
  //   CreateQRcodeState.getAmodzieState
  // );
  // userRateFromStore$?: Observable<StarRate> = this.#store.select(
  //   CreateQRcodeState.getUserStarRate
  // );
  // logoFromStore$?: Observable<string> = this.#store.select(
  //   CreateQRcodeState.getUploadLogo
  // );
  // userInputFromStore$?: Observable<InputUsers> = this.#store.select(
  //   CreateQRcodeState.getUserTips
  // );

  userCard$: Observable<Cards> = this.#store.select(ListOfCards.getCards);

  ngOnInit(): void {
    this.#btnService.eventClick$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        if (data.id === 8) {
          this.changeActiveClass(8);

          if (!this.arrBTN[0].text) return;

          const tmp = String(parseInt(this.arrBTN[0].text));
          this.setUpTips = { ...this.setUpTips, value: tmp };

          this.#cdr.detectChanges();
          this.#cdr.markForCheck();
        } else if (data.id === 9) {
          if (!this.arrBTN[1].text) return;
          this.changeActiveClass(9);

          const tmp = String(parseInt(this.arrBTN[1].text));
          this.setUpTips = { ...this.setUpTips, value: tmp };

          this.#cdr.detectChanges();
        } else if (data.id === 10) {
          if (!this.arrBTN[2].text) return;
          this.changeActiveClass(10);

          const tmp = String(parseInt(this.arrBTN[2].text));
          this.setUpTips = { ...this.setUpTips, value: tmp };

          this.#cdr.detectChanges();
        }
      });

    this.#switcherService.channelSwitcherFromService
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data: SwitcherData) => {
        if (data.title === EnumSwitcher.rate && data.value === true) {
          this.isOpen.set(true);

          this.#cdr.detectChanges();
        } else if (data.title === EnumSwitcher.rate && data.value === false) {
          this.isOpen.set(false);
        }

        if (data.title === EnumSwitcher.feedback && data.value === true) {
          this.isFeedbackOpen.set(true);
        } else if (
          data.title === EnumSwitcher.feedback &&
          data.value === false
        ) {
          this.isFeedbackOpen.set(false);
        }

        if (data.title === EnumSwitcher.impressions && data.value === true) {
          this.isAmodzieOpen.set(true);
        } else if (
          data.title === EnumSwitcher.impressions &&
          data.value === false
        ) {
          this.isAmodzieOpen.set(false);
        }
      });
  }

  validInput(data: Event): void {
    const key = Object.keys(data);
  }

  changeActiveClass(data: number): void {
    const activeID = data - 8;
    this.arrBTN.forEach((item, index) => {
      item.isActive = index === activeID;
    });
  }
}
