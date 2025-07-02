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
import { AmodzieComponent } from '../../../../shared/components/amodzie/amodzie.component';
import { AmodzieData } from '../../../../shared/components/amodzie/types/interfaces/amodzieStateData';
import { BordeerLineComponent } from '../../../../shared/components/bordeer-line/border-line.component';
import { ButtonsComponent } from '../../../../shared/components/buttons/buttons.component';
import { FeedbacksComponent } from '../../../../shared/components/feedbacks/feedbacks.component';
import { FeedbackData } from '../../../../shared/components/feedbacks/types/interfces/feedback';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { InputConfig } from '../../../../shared/components/input-text/types/interfaces/dataInput';
import { StarsRateComponent } from '../../../../shared/components/stars-rate/stars-rate.component';
import { DataStarRate } from '../../../../shared/components/stars-rate/types/interface/dataToStarRate';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { SwitcherStateService } from '../../../../shared/components/switcher/service/switch.service';
import { SwitcherData } from '../../../../shared/components/switcher/types/interface/switcherDataTransmit';
import { ListOfCards } from '../../../../state/cards/cards.state';
import { LogoProfileDefaultSource } from '../../../../types/enums/logoProfile';
import { ButtonConfig } from '../../../../types/interfaces/sectionItem';
import { SvgSpriteSetting } from '../../../../types/interfaces/svgIcon';
import { EnumSwitcher } from './../../../../shared/components/switcher/types/enum/enumSwitcher';

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

  setUpTips: InputConfig = {
    placeholder: 'от 100 до 600',
    unitCurrency: 'rub',
    value: '',
    type: 'number',
    disabled: true,
  };

  arrBTN: ButtonConfig[] = [
    {
      text: '0 ₽',
      background: '#EEEFF2',
      color: '#313436',
      borderStyle: 'none',
      isActive: false,
    },
    {
      text: '0 ₽',
      background: '#EEEFF2',
      color: '#313436',
      borderStyle: 'none',
      isActive: false,
    },
    {
      text: '0 ₽',
      background: '#EEEFF2',
      color: '#313436',
      borderStyle: 'none',
      isActive: false,
    },
  ];

  btnSendData: ButtonConfig = {
    text: 'Поблагодарить',
    disabled: true,
    background: '#8f8f8f',
    color: 'black',
    isActive: false,
  };

  dataToStarRate: DataStarRate = {
    disabled: false,
    rate: 0,
  };

  feedback: FeedbackData = {
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
  readonly #switcherService = inject(SwitcherStateService);
  readonly #store = inject(Store);

  userCard$ = this.#store.select(ListOfCards.getEditCard);

  ngOnInit(): void {
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
    this.arrBTN.forEach((item, index) => {
      item.isActive = index === data;
    });

    this.arrBTN[data] = { ...this.arrBTN[data], isActive: true };
    this.btnSendData = { ...this.btnSendData, disabled: false, isActive: true };
  }

  rating(data: DataStarRate) {
    // no-empty-function
   }

  amodzieSelected(smile: number) {
    // no-empty-function
  }

  onClick(text: string) {
    this.setUpTips = { ...this.setUpTips, value: text };
  }
}
