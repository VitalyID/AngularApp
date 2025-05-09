import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { provideNgxMask } from 'ngx-mask';
import { ButtonsComponent } from '../../../../shared/components/buttons/buttons.component';
import { ButtonService } from '../../../../shared/components/buttons/service/buttons.component.service';
import { ColorPickerComponent } from '../../../../shared/components/color-picker/color-picker.component';
import { DefaultColor } from '../../../../shared/components/color-picker/types/enum/default';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { DataInput } from '../../../../shared/components/input-text/types/interfaces/dataInput';
import { SwitcherComponent } from '../../../../shared/components/switcher/switcher.component';
import { UploadLogoComponent } from '../../../../shared/components/upload-logo/upload-logo.component';
import { ButtonData } from '../../../../types/sectionItem';
import { AddUploadLogo } from '../../state/qr-code-creator.action';
// import { InputUsers } from '../../types/interface/inputUsers';
import { UserPreviewComponent } from '../tipPagePreview/tipPagePreview.component';
import { EnumSwitcher } from './../../../../shared/components/switcher/types/enum/enumSwitcher';
@Component({
  selector: 'create-qrcode',
  imports: [
    ReactiveFormsModule,
    SwitcherComponent,
    ColorPickerComponent,
    UploadLogoComponent,
    InputTextComponent,
    CommonModule,
    UserPreviewComponent,
    ButtonsComponent,
    // AsideComponent,
    // EscCloseDirective,
    // ClickOutsideDirective,
  ],
  templateUrl: './tipQRCodeCreator.component.html',
  styleUrl: './tipQRCodeCreator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNgxMask()],
})
export class CreateQRcodeComponent implements OnInit {
  @ViewChild('preview') previewIMG!: ElementRef;

  // asideID: number = 0;
  // isValidInput: boolean = false;
  // isOpen: boolean = false;
  // isClose: boolean = true;
  // feedbackOpen: boolean = false;
  // feedbackClose: boolean = true;
  listSwitchKeys = Object.keys(EnumSwitcher);

  enumSwitcher = EnumSwitcher;

  userSettingData: any = {};
  myForm!: FormGroup;
  // inputFromStore$?: Observable<InputUsers>;
  // colorSubstrate: string = '';
  // colorBtn: string = '';

  // menuState: boolean = false;
  // isShadow: boolean = false;

  // isOpen transmitted to Drectives for checking state component aside.
  // Component Aside is open after 1s, because its time need for animations
  isOpen: boolean = false;

  defaultDataInput: number[] = [100, 150, 200];
  defaultSwitcher: boolean = false;

  inputSmallTip: DataInput = {
    // inputID: 'inputID-1',
    validation: true,
    unitCurrency: 'rub',
    validationFrom: '0',
    validationTo: '1000',
    value: '',
    placeholder: '100',
    type: 'number',
    disabled: false,
  };

  inputMiddleTip: DataInput = {
    // inputID: 'inputID-2',
    validation: true,
    unitCurrency: 'rub',
    validationFrom: '0',
    validationTo: '1000',
    value: '',
    placeholder: '150',
    type: 'number',
    disabled: false,
  };

  inputBigTip: DataInput = {
    placeholder: '200',
    // inputID: 'inputID-3',
    validation: true,
    unitCurrency: 'rub',
    validationFrom: '0',
    validationTo: '1000',
    value: '',
    type: 'number',
    disabled: false,
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

  defaultColorSubstrate: string = DefaultColor.color;
  defaultColorBTN: string = DefaultColor.color;
  // cardCount: number = 0;

  // readonly #routeService = inject(RoutIDservice);
  // readonly #route = inject(ActivatedRoute);
  readonly #store = inject(Store);
  // readonly #menuService = inject(StateMenuService);
  readonly #destroyRef = inject(DestroyRef);
  // readonly #cdr = inject(ChangeDetectorRef);
  readonly #btnService = inject(ButtonService);
  // =====================================
  // readonly #http = inject(GetDataQrService);

  // =====================================

  ngOnInit() {
    console.log('start');

    // this.#http
    //   .getQR()
    //   .pipe(takeUntilDestroyed(this.#destroyRef))
    //   .subscribe((data) => {
    //     console.log('data from server^', data);
    //     this.cardCount = Object.keys(data).length;
    //   });

    this.#btnService.eventClick$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        // console.log(data, '3333333');
        // this.#store.dispatch(new AddIdCard(this.cardCount + 1));
      });
  }

  listItemSwitch() {
    for (let item of Object.keys(EnumSwitcher)) {
      this.listSwitchKeys.push(item as keyof typeof EnumSwitcher);
    }
  }

  onClickSubstrate(data: string) {
    // Цвет подложки готов. Можем диспатчить сразу дату
  }

  onClickColorBTN(data: string) {
    // Цвет подложки готов. Можем диспатчить сразу дату
  }

  // userSetColor(btn: string, substrate: string) {
  //   this.#store.dispatch(new AddUserColor(substrate, btn));
  // }

  uploadLogo(data: string) {
    this.#store.dispatch(new AddUploadLogo(data));
    //  Загрузка фото готова к диспатчу
  }

  SendDataStore(index: number, tip: number) {
    this.defaultDataInput = [
      ...this.defaultDataInput.slice(0, index),
      Number(tip),
      ...this.defaultDataInput.slice(index + 1),
    ];
    console.log(this.defaultDataInput);
    // готовый массив данных с инпута
    // this.#store.dispatch(new UpdateCards())
  }

  isSwitcher(key: number, state: boolean) {
    switch (key) {
      case 1:
        console.log(this.enumSwitcher.rate, state);
        break;
      case 2:
        console.log(this.enumSwitcher.feedback, state);
        break;
      case 3:
        console.log(this.enumSwitcher.impressions, state);
        break;
    }
    // готовые данные со свитчеров
  }

  clickOn() {
    // отправляем в сервис клик по кнопке с ее идентификатором "3".
    this.#btnService.clickOnButton(this.btnText.id);
  }
}
