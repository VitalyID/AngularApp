import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AmodzieComponent } from '../../../../shared/components/amodzie/amodzie.component';
import { AmodzieData } from '../../../../shared/components/amodzie/types/interfaces/amodzieStateData';
import { ButtonsComponent } from '../../../../shared/components/buttons/buttons.component';
import { ButtonService } from '../../../../shared/components/buttons/service/buttons.component.service';
import { FeedbacksComponent } from '../../../../shared/components/feedbacks/feedbacks.component';
import { FeedbackData } from '../../../../shared/components/feedbacks/types/interfces/feedback';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { DataInput } from '../../../../shared/components/input-text/types/interfaces/dataInput';
import { StarsRateComponent } from '../../../../shared/components/stars-rate/stars-rate.component';
import { DataStarRate } from '../../../../shared/components/stars-rate/types/interface/dataToStarRate';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { SwitcherData } from '../../../../shared/components/switcher/interface/switcherDataTransmit';
import { SwitcherStateService } from '../../../../shared/components/switcher/service/switch.service';
import { UploadTransmitPhotoService } from '../../../../shared/components/upload-logo/services/uploadTransmitPhoto.service';
import { LogoProfileDefaultSource } from '../../../../types/enums/logoProfile';
import { SvgSpriteSetting } from '../../../../types/interfaces/svgIcon';
import { ButtonData } from '../../../../types/sectionItem';
import {
  AmodzieModel,
  AmodzieState,
  InputUsersModel,
  SetUserStarRate,
  SetUserTips,
  StarRateModel,
  UploadLogoState,
  userFeedbackModel,
  userFeedbackState,
} from '../../state/qr-code-creator.state';
import { InputUsers } from './../../types/interface/inputUsers';

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
  ],
  templateUrl: './tipPagePreview.component.html',
  styleUrl: './tipPagePreview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreviewComponent implements OnInit, AfterViewInit {
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
    },
    {
      text: '0 ₽',
      background: '#EEEFF2',
      color: '#313436',
      id: 9,
      borderStyle: 'none',
    },
    {
      text: '0 ₽',
      background: '#EEEFF2',
      color: '#313436',
      id: 10,
      borderStyle: 'none',
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
    disabled: true,
    rate: 0,
  };

  feedbackText: FeedbackData = {
    text: '',
    readonly: true,
  };

  amodzieData: AmodzieData = { rate: 0, readonly: false };

  userSettingData: any = {};
  isOpen: boolean = false;
  isClose: boolean = true;
  isFeedbackOpen: boolean = false;
  isFeedbackClose: boolean = true;
  isAmodzieClose: boolean = true;
  isAmodzieOpen: boolean = false;
  isActive: number = 0;

  logoFromStore$?: Observable<string>;
  userInputFromStore$?: Observable<InputUsersModel>;
  userRateFromStore$?: Observable<StarRateModel>;
  userFeedbackStore$?: Observable<userFeedbackModel>;
  userAmodzieStore$?: Observable<AmodzieModel>;
  #logo?: Subscription;
  #ArrBtnText?: Subscription;
  #rate?: Subscription;
  #userFeedbackText?: Subscription;
  #userAmodzie?: Subscription;

  readonly #logoService = inject(UploadTransmitPhotoService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #render2 = inject(Renderer2);
  readonly #cdr = inject(ChangeDetectorRef);
  // readonly #setBTNService = inject(UserSetButtonService);
  readonly #btnService = inject(ButtonService);
  readonly #switcherService = inject(SwitcherStateService);
  readonly #store = inject(Store);

  ngOnInit(): void {
    this.#logoService.getUserPhotoFromService$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        if (data) {
          this.previewIMG.nativeElement.src = data;
          this.#render2.setProperty(
            this.previewIMG.nativeElement,
            'display',
            'block'
          );
        }
        this.#cdr.markForCheck();
      });

    this.userInputFromStore$ = this.#store.select(SetUserTips.getUserTips);
    this.#ArrBtnText = this.userInputFromStore$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data: InputUsers) => {
        this.updateBTNtext(data);
      });

    this.userRateFromStore$ = this.#store.select(
      SetUserStarRate.getUserStarRate
    );
    this.#rate = this.userRateFromStore$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        this.dataToStarRate = { ...this.dataToStarRate, rate: data.rate };
      });

    this.userFeedbackStore$ = this.#store.select(
      userFeedbackState.getMyFeedback
    );
    this.#userFeedbackText = this.userFeedbackStore$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        this.feedbackText = {
          ...this.feedbackText,
          text: data.text,
          readonly: true,
        };
      });

    this.userAmodzieStore$ = this.#store.select(AmodzieState.getAmodzieState);
    this.#userAmodzie = this.userAmodzieStore$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        this.amodzieData = {
          ...this.amodzieData,
          rate: data.rate,
          readonly: true,
        };
      });

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
        if (data.title === 'rate' && data.value === true) {
          this.isOpen = true;
          this.isClose = false;

          this.#cdr.detectChanges();
        } else if (data.title === 'rate' && data.value === false) {
          this.isOpen = false;
          this.isClose = true;

          this.#cdr.detectChanges();
        }

        if (data.title === 'feedback' && data.value === true) {
          this.isFeedbackOpen = true;
          this.isFeedbackClose = false;
          this.#cdr.detectChanges();
        } else if (data.title === 'feedback' && data.value === false) {
          this.isFeedbackOpen = false;
          this.isFeedbackClose = true;
          this.#cdr.detectChanges();
        }

        if (data.title === 'impressions' && data.value === true) {
          this.isAmodzieOpen = true;
          this.isAmodzieClose = false;
          this.#cdr.detectChanges();
        } else if (data.title === 'impressions' && data.value === false) {
          this.isAmodzieOpen = false;
          this.isAmodzieClose = true;
          this.#cdr.detectChanges();
        }
      });
  }

  ngAfterViewInit(): void {
    this.logoFromStore$ = this.#store.select(UploadLogoState.getUploadLogo);
    this.#logo = this.logoFromStore$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        console.log('Лого из стора получено превью ', data);

        if (data) {
          this.previewIMG.nativeElement.src = data;
          this.#render2.setProperty(
            this.previewIMG.nativeElement,
            'display',
            'block'
          );
        } else {
          console.log(4444444);
        }
        this.#cdr.markForCheck();
      });
  }

  validInput(data: Event): void {
    const key = Object.keys(data);
    // if (data[key[0]] === 0 || data[key[0]] === null) {
    //   this.btnSendData.background = 'grey';
    //   this.btnSendData.color = '#696d6a';
    //   this.btnSendData.disabled = true;
    // } else {
    //   this.btnSendData.background = '#3bc76b';
    //   this.btnSendData.color = '#ffffff';
    //   this.btnSendData.disabled = false;
    // }
  }

  updateBTNtext(data: InputUsers) {
    this.arrBTN[0].text = `${data['inputID-1']} ₽`;
    this.arrBTN[1].text = `${data['inputID-2']} ₽`;
    this.arrBTN[2].text = `${data['inputID-3']} ₽`;

    this.#cdr.detectChanges();
  }

  changeActiveClass(data: number): void {
    const activeID = data - 8;
    this.arrBTN.forEach((item, index) => {
      item.isActive = index === activeID;
    });
  }
}
