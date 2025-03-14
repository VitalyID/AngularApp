import { CommonModule } from '@angular/common';
import {
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
import { SharedModule } from '../../../../shared.module';
import { SvgSpriteSetting } from '../../../../types/interfaces/svgIcon';
import { ButtonData } from '../../../../types/sectionItem';
import { AmodzieComponent } from '../../../amodzie/amodzie.component';
import { ButtonService } from '../../../buttons/service/buttons.component.service';
import { FeedbacksComponent } from '../../../feedbacks/feedbacks.component';
import { InputUserTipsComponent } from '../../../input-user-tips/input-user-tips.component';
import { DataFromUserInput } from '../../../input-user-tips/types/interfaces/DataFromUserInput';
import { UserSetting } from '../../../input-user-tips/types/interfaces/UserDataSetting';
import { StarsRateComponent } from '../../../stars-rate/stars-rate.component';
import { SvgIconComponent } from '../../../svg-icon/svg-icon.component';
import { SwitcherData } from '../../../switcher/interface/switcherDataTransmit';
import { SwitcherStateService } from '../../../switcher/service/switch.service';
import { UploadTransmitPhotoService } from '../../../upload-logo/services/uploadTransmitPhoto.service';
import { UserSetButtonService } from '../services/userSetUpTips.service';
import { DataInput } from './../../../input-user-tips/types/interfaces/dataInput';

@Component({
  selector: 'user-preview',
  imports: [
    SvgIconComponent,
    InputUserTipsComponent,
    SharedModule,
    StarsRateComponent,
    CommonModule,
    FeedbacksComponent,
    AmodzieComponent,
  ],
  templateUrl: './user-preview.component.html',
  styleUrl: './user-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreviewComponent implements OnInit {
  @ViewChild('preview') previewIMG!: ElementRef;

  svgLogo: SvgSpriteSetting = {
    iconID: 'Logo',
    height: '40px',
    width: '200px',
  };

  setUpTips: DataInput = {
    placeholder: 'от 100 до 600',
    inputID: 'inputID-4',
    validation: true,
    unitCurrency: 'rub',
    value: '',
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

  userSettingData: any = {};
  isOpen: boolean = false;
  isClose: boolean = true;
  isFeedbackOpen: boolean = false;
  isFeedbackClose: boolean = true;
  isAmodzieClose: boolean = true;
  isAmodzieOpen: boolean = false;

  readonly #logoService = inject(UploadTransmitPhotoService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #render2 = inject(Renderer2);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #setBTNService = inject(UserSetButtonService);
  readonly #btnService = inject(ButtonService);
  readonly #switcherService = inject(SwitcherStateService);

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

    this.#setBTNService.channelDataInputTips$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data: UserSetting) => {
        this.updateBTNtext(data);
      });
    this.#btnService.eventClick$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        if (data.id === 8) {
          if (!this.arrBTN[0].text) return;

          this.arrBTN[0].isActive = true;
          this.arrBTN[1].isActive = false;
          this.arrBTN[2].isActive = false;

          const tmp = this.arrBTN[0].text.split(' ')[0];
          this.setUpTips = { ...this.setUpTips, value: tmp };

          this.#cdr.detectChanges();
          this.#cdr.markForCheck();
        } else if (data.id === 9) {
          if (!this.arrBTN[1].text) return;

          this.arrBTN[0].isActive = false;
          this.arrBTN[1].isActive = true;
          this.arrBTN[2].isActive = false;

          const tmp = this.arrBTN[1].text.split(' ')[0];
          this.setUpTips = { ...this.setUpTips, value: tmp };

          this.#cdr.detectChanges();
        } else if (data.id === 10) {
          if (!this.arrBTN[2].text) return;

          this.arrBTN[0].isActive = false;
          this.arrBTN[1].isActive = false;
          this.arrBTN[2].isActive = true;

          const tmp = this.arrBTN[2].text.split(' ')[0];
          this.setUpTips = { ...this.setUpTips, value: tmp };

          this.#cdr.detectChanges();
        }
      });

    this.#switcherService.channelSwitcherFromService
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data: SwitcherData) => {
        console.log(data.title, data.value);

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

  validInput(data: DataFromUserInput): void {
    // console.log(data);
    const key = Object.keys(data);
    // console.log(key[0], data[key[0]]);
    if (data[key[0]] === 0 || data[key[0]] === null) {
      console.log('сработало');
      this.btnSendData.background = 'grey';
      this.btnSendData.color = '#696d6a';
      this.btnSendData.disabled = true;
    } else {
      this.btnSendData.background = '#3bc76b';
      this.btnSendData.color = '#ffffff';
      this.btnSendData.disabled = false;
    }
  }

  updateBTNtext(data: { [key: string]: number }) {
    const key = Object.keys(data);

    switch (key[0]) {
      case 'inputID-1':
        this.arrBTN[0].text = String(data[key[0]]) + ' ₽';
        break;
      case 'inputID-2':
        this.arrBTN[1].text = String(data[key[0]]) + ' ₽';
        break;
      case 'inputID-3':
        this.arrBTN[2].text = String(data[key[0]]) + ' ₽';
        break;
    }
    this.#cdr.detectChanges();
  }
}
