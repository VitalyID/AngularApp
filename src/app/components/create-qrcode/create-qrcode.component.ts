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
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { RoutIDservice } from '../../services/transmitDataRout.service';
import { SharedModule } from '../../shared.module';
import { SvgSpriteSetting } from '../../types/interfaces/svgIcon';
import { ButtonData } from '../../types/sectionItem';
import { ButtonService } from '../buttons/service/buttons.component.service';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { InputUserTipsComponent } from '../input-user-tips/input-user-tips.component';
import { DataInput } from '../input-user-tips/types/interfaces/dataInput';
import { StarsRateComponent } from '../stars-rate/stars-rate.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SwitcherData } from '../switcher/interface/switcherDataTransmit';
import { SwitcherComponent } from '../switcher/switcher.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { UploadLogoComponent } from '../upload-logo/upload-logo.component';
import { EnumSwitcher } from './types/enum/enumSwitcher';

@Component({
  selector: 'create-qrcode',
  imports: [
    ReactiveFormsModule,
    SwitcherComponent,
    ColorPickerComponent,
    UploadLogoComponent,
    SharedModule,
    SvgIconComponent,
    InputUserTipsComponent,
    CommonModule,
    StarsRateComponent,
    TextAreaComponent,
  ],
  templateUrl: './create-qrcode.component.html',
  styleUrl: './create-qrcode.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNgxMask()],
})
export class CreateQRcodeComponent implements OnInit {
  @ViewChild('preview') previewIMG!: ElementRef;

  asideID: number = 0;
  isValidInput: boolean = false;
  isOpen: boolean = false;
  isClose: boolean = true;
  feedbackOpen: boolean = false;
  feedbackClose: boolean = true;
  listSwitchKeys: (keyof typeof EnumSwitcher)[] = [];
  enumSwitcher = EnumSwitcher;
  userSettingData: any = {};
  myForm!: FormGroup;

  // UserDataSettings send to server
  // userDataSettings: UserSetting[] = [
  //   {
  //     'inputID-1': 100,
  //   },
  //   {
  //     'inputID-2': 150,
  //   },
  //   {
  //     'inputID-3': 200,
  //   },
  // ];

  dataToInputChild: DataInput[] = [
    {
      placeholder: '100',

      inputID: 'inputID-1',
      validation: true,
      unitCurrency: 'rub',

      value: '',
    },
    {
      placeholder: '150',
      inputID: 'inputID-2',
      validation: true,
      unitCurrency: 'rub',
      value: '',
    },
    {
      placeholder: '200',
      inputID: 'inputID-3',
      validation: true,
      unitCurrency: 'rub',
      value: '',
    },
  ];

  setUpTips: DataInput = {
    placeholder: 'от 100 до 600',
    inputID: 'inputID-4',
    validation: true,
    unitCurrency: 'rub',
    value: '',
  };

  svgLogo: SvgSpriteSetting = {
    iconID: 'Logo',
    height: '40px',
    width: '200px',
  };

  btnText: ButtonData = {
    id: 7,
    text: 'Создать QR-код',
  };

  arrBTN: ButtonData[] = [
    {
      text: '100 ₽',
      background: '#EEEFF2',
      color: '#313436',
      id: 8,
      borderStyle: 'none',
    },
    {
      text: '150 ₽',
      background: '#EEEFF2',
      color: '#313436',
      id: 9,
      borderStyle: 'none',
    },
    {
      text: '200 ₽',
      background: '#EEEFF2',
      color: '#313436',
      id: 10,
      borderStyle: 'none',
    },
  ];

  readonly #routeService = inject(RoutIDservice);
  readonly #route = inject(ActivatedRoute);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #render2 = inject(Renderer2);
  // readonly #fb = inject(FormBuilder);
  readonly #destroyRef = inject(DestroyRef);
  readonly #btnClick = inject(ButtonService);

  ngOnInit(): void {
    this.listItemSwitch();

    // here is control to active menu on aside-bar
    this.asideID = this.#route.snapshot.data['asideID'];
    this.#routeService.getDataRoute(this.asideID);

    this.#btnClick.eventClick$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        switch (data.id) {
          case 8:
            this.setUpTips.value = String(this.arrBTN[0].text?.split(' ')[0]);
            const setUpTips1 = {
              ...this.setUpTips,
              value: this.setUpTips.value,
            };
            this.setUpTips = setUpTips1;
            break;
          case 9:
            this.setUpTips.value = String(this.arrBTN[1].text?.split(' ')[0]);
            const setUpTips2 = {
              ...this.setUpTips,
              value: this.setUpTips.value,
            };
            this.setUpTips = setUpTips2;
            break;
          case 10:
            this.setUpTips.value = String(this.arrBTN[2].text?.split(' ')[0]);
            const setUpTips3 = {
              ...this.setUpTips,
              value: this.setUpTips.value,
            };
            this.setUpTips = setUpTips3;
            break;
        }
      });
  }

  listItemSwitch() {
    for (let item of Object.keys(EnumSwitcher)) {
      this.listSwitchKeys.push(item as keyof typeof EnumSwitcher);
    }
  }

  uploadedFile(data: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.previewIMG.nativeElement.src = e.target.result;
      this.#render2.setProperty(
        this.previewIMG.nativeElement,
        'display',
        'block'
      );
    };
    this.#cdr.markForCheck();
    reader.readAsDataURL(data);

    this.userSettingData.picture = data;
  }

  inValid(data: {}) {
    this.isValidInput = data ? true : false;
    this.#cdr.detectChanges();
  }

  switcherFromChild(data: SwitcherData) {
    console.log(data);
    if (data.title === 'rate' && data.value === true) {
      this.isOpen = true;
      this.isClose = false;
    } else if (data.title === 'rate' && data.value === false) {
      this.isOpen = false;
      this.isClose = true;
    }

    if (data.title === 'feedback' && data.value === true) {
      this.feedbackOpen = true;
      this.feedbackClose = false;
    } else if (data.title === 'feedback' && data.value === false) {
      this.feedbackOpen = false;
      this.feedbackClose = true;
    }
  }

  updateBTNtext(data: { [key: string]: number }) {
    const key = Object.keys(data);
    if (key[0] === 'inputID-1') {
      this.arrBTN[0].text = String(data[key[0]]);
    }

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
  }
}
