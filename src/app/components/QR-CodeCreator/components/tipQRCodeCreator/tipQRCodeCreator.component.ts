import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { provideNgxMask } from 'ngx-mask';
import { ButtonsComponent } from '../../../../shared/components/buttons/buttons.component';
import { ButtonService } from '../../../../shared/components/buttons/service/buttons.component.service';
import { ColorPickerComponent } from '../../../../shared/components/color-picker/color-picker.component';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { SwitcherComponent } from '../../../../shared/components/switcher/switcher.component';
import { UploadLogoComponent } from '../../../../shared/components/upload-logo/upload-logo.component';
import { ButtonData } from '../../../../types/sectionItem';
import { DataInput } from './../../../../shared/components/input-text/types/interfaces/dataInput';
import { ListOfCards, UserCard } from './../../../../state/cards.state';
// import { InputUsers } from '../../types/interface/inputUsers';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
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
  ],
  templateUrl: './tipQRCodeCreator.component.html',
  styleUrl: './tipQRCodeCreator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNgxMask()],
})
export class CreateQRcodeComponent implements OnInit {
  @ViewChild('preview') previewIMG!: ElementRef;

  listSwitchKeys = Object.keys(EnumSwitcher);

  enumSwitcher = EnumSwitcher;

  userSettingData: any = {};
  myForm!: FormGroup;
  backgroundColor: string = '';
  btnColor: string = '';
  logo: string = '';
  rate: boolean = false;
  feedback: boolean = false;
  impression: boolean = false;

  // isOpen transmitted to Directives for checking state component aside.
  // Component Aside is open after 1s, because its time need for animations
  isOpen: boolean = false;

  card: UserCard[] = [
    {
      background_hex_color: '',
      business_payment_type: '',
      button_hex_color: '',
      commission_coverage: false,
      employee_display: false,
      id: 0,
      logo_file_id: null,
      platform_id: 'string',
      preset_payment_sizes: [0, 0, 0],
      qr_image: '',
      rating: false,
      reviews: false,
      smiles: false,
    },
  ];

  inputSmallTip: Signal<DataInput> = computed(() => ({
    validation: true,
    unitCurrency: 'rub',
    validationFrom: '0',
    validationTo: '1000',
    value: '',
    placeholder: this.card$()?.cards[0].preset_payment_sizes[0].toString(),
    type: 'number',
    disabled: false,
  }));

  inputMiddleTip: Signal<DataInput> = computed(() => ({
    validation: true,
    unitCurrency: 'rub',
    validationFrom: '0',
    validationTo: '1000',
    value: '',
    placeholder: this.card$()?.cards[0].preset_payment_sizes[1].toString(),
    type: 'number',
    disabled: false,
  }));

  inputBigTip: Signal<DataInput> = computed(() => ({
    validation: true,
    unitCurrency: 'rub',
    validationFrom: '0',
    validationTo: '1000',
    value: '',
    placeholder: this.card$()?.cards[0].preset_payment_sizes[2].toString(),
    type: 'number',
    disabled: false,
  }));

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

  // transmit state switcher to component (true/false) by Signal
  isOnRate: Signal<boolean> = computed(() => this.card$()?.cards[0].rating);
  isOnFeedback: Signal<boolean> = computed(
    () => this.card$()?.cards[0].reviews
  );
  isOnImpressions: Signal<boolean> = computed(
    () => this.card$()?.cards[0].smiles
  );

  readonly #store = inject(Store);
  readonly #destroyRef = inject(DestroyRef);
  readonly #btnService = inject(ButtonService);

  card$ = toSignal(this.#store.select(ListOfCards.getCards), {
    initialValue: {
      cards: [
        {
          background_hex_color: '',
          business_payment_type: '',
          button_hex_color: '',
          commission_coverage: false,
          employee_display: true,
          id: 0,
          logo_file_id: null,
          platform_id: '',
          preset_payment_sizes: [0, 0, 0],
          qr_image: '',
          rating: false,
          reviews: false,
          smiles: false,
        },
      ],
      error: null,
    },
  });

  defaultDataInput: number[] = [
    this.card$()?.cards[0].preset_payment_sizes[0],
    this.card$()?.cards[0].preset_payment_sizes[1],
    this.card$()?.cards[0].preset_payment_sizes[2],
  ];

  ngOnInit() {
    // console.log('рейцтинг', this.isOnRate());
    // console.log('отзыв', this.isOnFeedback());
    // console.log('смайлик', this.isOnImpressions());

    // Create new card by user settings
    this.#btnService.eventClick$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        if (data.id === 7) {
          // console.log('Coplftv ffvfdvdfvfd');

          this.card = [
            {
              background_hex_color: this.backgroundColor,
              business_payment_type: '',
              button_hex_color: this.btnColor,
              commission_coverage: false,
              employee_display: false,
              // id надо переделать - заполнять актуальным числом карт
              id: 0,
              logo_file_id: this.logo,
              platform_id: 'string',
              preset_payment_sizes: this.defaultDataInput,
              qr_image: '',
              rating: this.rate,
              reviews: this.feedback,
              smiles: this.impression,
            },
          ];

          console.log(this.card);
        }
      });
  }

  listItemSwitch() {
    for (let item of Object.keys(EnumSwitcher)) {
      this.listSwitchKeys.push(item as keyof typeof EnumSwitcher);
    }
  }

  onClickColor(target: string, data: string) {
    switch (target) {
      case 'background':
        this.backgroundColor = data;
        break;
      case 'btnColor':
        this.btnColor = data;
    }
  }

  uploadLogo(data: string) {
    this.logo = data;
  }

  SendDataStore(index: number, tip: number) {
    this.defaultDataInput = [
      ...this.defaultDataInput.slice(0, index),
      Number(tip),
      ...this.defaultDataInput.slice(index + 1),
    ];
    console.log(this.defaultDataInput);
  }

  isSwitcher(key: number, state: boolean) {
    switch (key) {
      case 1:
        this.rate = state;
        break;
      case 2:
        this.feedback = state;
        break;
      case 3:
        this.impression = state;
        break;
    }
  }

  clickOn() {
    // отправляем в сервис клик по кнопке с ее идентификатором "3".
    this.#btnService.clickOnButton(this.btnText.id);
  }
}
