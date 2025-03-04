import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { RoutIDservice } from '../../services/transmitDataRout.service';
import { SharedModule } from '../../shared.module';
import { SvgSpriteSetting } from '../../types/interfaces/svgIcon';
import { DataInput } from './../input-userTips/types/interfaces/dataInput';
// import { UserSettingData } from '../../types/interfaces/userSettingData';
import { ButtonData } from '../../types/sectionItem';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { InputUserTipsComponent } from '../input-userTips/input-userTips.component';
import { UserSetting } from '../input-userTips/types/interfaces/UserDataSetting';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SwitcherComponent } from '../switcher/switcher.component';
import { UploadLogoComponent } from '../upload-logo/upload-logo.component';
import { EnumSwitcher } from './types/enum/enumSwitcher';

@Component({
  selector: 'create-qrcode',
  imports: [
    ReactiveFormsModule,
    // NgxMaskDirective,
    SwitcherComponent,
    ColorPickerComponent,
    UploadLogoComponent,
    SharedModule,
    SvgIconComponent,
    InputUserTipsComponent,
  ],
  templateUrl: './create-qrcode.component.html',
  styleUrl: './create-qrcode.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNgxMask()],
})
export class CreateQRcodeComponent implements OnInit {
  @ViewChild('preview') previewIMG!: ElementRef;

  asideID: number = 0;
  // UserDataSettings send to server
  UserDataSettings: UserSetting[] = [
    {
      'inputID-1': 100,
    },
    {
      'inputID-2': 150,
    },
    {
      'inputID-3': 200,
    },
  ];

  dataToInputChild: DataInput[] = [
    {
      placeholder: '100',
      type: 'number',
      inputID: 'inputID-1',
      validation: true,
      unitCurrency: '₽',
    },
    {
      placeholder: '150',
      type: 'number',
      inputID: 'inputID-2',
      validation: true,
      unitCurrency: '₽',
    },
    {
      placeholder: '200',
      type: 'number',
      inputID: 'inputID-3',
      validation: true,
      unitCurrency: '₽',
    },
  ];

  setUpTips: DataInput = {
    placeholder: 'от 100 до 600',
    type: 'number',
    inputID: 'inputID-4',
    validation: true,
    unitCurrency: '₽',
    validFrom: 100,
    validTo: 600,
  };

  // Its data from input about amount user-tips
  dataFromInput(data: {}) {
    console.log('Data from Input: ', data);
    // this.updateUserSetting(data);
    this.updateBTNtext(data);
  }

  listSwitchKeys: (keyof typeof EnumSwitcher)[] = [];
  enumSwitcher = EnumSwitcher;

  svgLogo: SvgSpriteSetting = {
    iconID: 'Logo',
    height: '40px',
    width: '200px',
  };

  UserSettingData: any = {};
  myForm!: FormGroup;

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
  readonly #fb = inject(FormBuilder);

  ngOnInit(): void {
    this.listItemSwitch();

    // here is control to active menu on aside-bar
    this.asideID = this.#route.snapshot.data['asideID'];
    this.#routeService.getDataRoute(this.asideID);
    this.#cdr.markForCheck();
    this.#cdr.detectChanges();
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

    this.UserSettingData.picture = data;
  }

  // updateUserSetting(data: { [key: string]: number }) {
  //   const newUserKey = Object.keys(data)[0];
  //   console.log(typeof newUserKey);

  //   const itemToUpdate = this.UserDataSettings?.find((item) => {
  //     return newUserKey === Object.keys(item)[0];
  //   });

  //   console.log('найден ', itemToUpdate);

  //   if (itemToUpdate) {
  //     const typedItem = itemToUpdate as { [key: string]: number };
  //     typedItem[newUserKey] = data[newUserKey];
  //   }

  //   console.log(this.UserDataSettings);
  // }

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
