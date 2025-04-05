import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
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

  readonly #destroyRef = inject(DestroyRef);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #btnService = inject(ButtonService);
  readonly #switcherService = inject(SwitcherStateService);
  readonly #store = inject(Store);

  userFeedback$: Observable<userFeedbackModel> = this.#store.select(
    userFeedbackState.getMyFeedback
  );
  userAmodzieStore$: Observable<AmodzieModel> = this.#store.select(
    AmodzieState.getAmodzieState
  );
  userRateFromStore$?: Observable<StarRateModel> = this.#store.select(
    SetUserStarRate.getUserStarRate
  );
  logoFromStore$?: Observable<string> = this.#store.select(
    UploadLogoState.getUploadLogo
  );
  userInputFromStore$?: Observable<InputUsersModel> = this.#store.select(
    SetUserTips.getUserTips
  );

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

  changeActiveClass(data: number): void {
    const activeID = data - 8;
    this.arrBTN.forEach((item, index) => {
      item.isActive = index === activeID;
    });
  }
}
