import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
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
import { toSignal } from '@angular/core/rxjs-interop';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PostCard, UpdateEditCard } from '../../../../state/cards.action';
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
  providers: [provideNgxMask(), provideAnimations()],
})
export class CreateQRcodeComponent implements OnInit {
  @ViewChild('preview') previewIMG!: ElementRef;

  listSwitchKeys = Object.keys(EnumSwitcher);

  enumSwitcher = EnumSwitcher;

  userSettingData: any = {};
  myForm!: FormGroup;
  backgroundColor: string = '';
  btnColor: string = '';
  // logo: string = '';
  logo: number = 0;
  rate: boolean = false;
  feedback: boolean = false;
  impression: boolean = false;

  // isOpen transmitted to Directives for checking state component aside.
  // Component Aside is open after 1s, because its time need for animations
  isOpen: boolean = false;

  inputSmallTip: Signal<DataInput> = computed(() => ({
    validation: true,
    unitCurrency: 'rub',
    validationFrom: '0',
    validationTo: '1000',
    value: '',
    placeholder: this.card$()?.preset_payment_sizes[0].toString(),
    type: 'number',
    disabled: false,
  }));

  inputMiddleTip: Signal<DataInput> = computed(() => ({
    validation: true,
    unitCurrency: 'rub',
    validationFrom: '0',
    validationTo: '1000',
    value: '',
    placeholder: this.card$()?.preset_payment_sizes[1].toString(),
    type: 'number',
    disabled: false,
  }));

  inputBigTip: Signal<DataInput> = computed(() => ({
    validation: true,
    unitCurrency: 'rub',
    validationFrom: '0',
    validationTo: '1000',
    value: '',
    placeholder: this.card$()?.preset_payment_sizes[2].toString(),
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

  newCard: UserCard = {
    background_hex_color: '',
    business_payment_type: '',
    button_hex_color: '',
    commission_coverage: false,
    employee_display: true,
    id: 0,
    logo_file_id: 0,
    platform_id: '',
    preset_payment_sizes: [0, 0, 0],
    qr_image: '',
    rating: false,
    reviews: false,
    smiles: false,
  };

  // transmit state switcher to component (true/false) by Signal
  isOnRate: Signal<boolean> = computed(() => this.card$()?.rating);
  isOnFeedback: Signal<boolean> = computed(() => this.card$()?.reviews);
  isOnImpressions: Signal<boolean> = computed(() => this.card$()?.smiles);

  readonly #store = inject(Store);
  // readonly #destroyRef = inject(DestroyRef);
  readonly #btnService = inject(ButtonService);
  // readonly #storeTest = inject(CardService);
  readonly #toast = inject(ToastrService);
  // readonly #postService = inject(PostCardService);

  card$ = toSignal(this.#store.select(ListOfCards.getEditCard), {
    initialValue: {
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
  });

  defaultDataInput: number[] = [
    this.card$()?.preset_payment_sizes[0],
    this.card$()?.preset_payment_sizes[1],
    this.card$()?.preset_payment_sizes[2],
  ];

  ngOnInit() {
    this.#store.dispatch(
      new UpdateEditCard(this.updateCard('logo_file_id', 0))
    );
  }

  OnCreateCard() {
    this.#store.dispatch(new PostCard(this.card$()));
    console.log('получены данные со стора', this.card$());
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
        this.#store.dispatch(
          new UpdateEditCard(this.updateCard('background_hex_color', data))
        );
        this.#store.select(ListOfCards.getEditCard);

        break;
      case 'btnColor':
        this.btnColor = data;
        this.#store.dispatch(
          new UpdateEditCard(this.updateCard('button_hex_color', data))
        );
        this.#store.select(ListOfCards.getEditCard);
        break;
    }
  }

  uploadLogo(data: string) {
    // Don't switch on logo, because there is problem with types
    // this.#store.dispatch(
    //   new UpdateEditCard(this.updateCard('logo_file_id', data))
    // );
  }

  sendDataStore(index: number, tip: number) {
    this.defaultDataInput = [
      ...this.defaultDataInput.slice(0, index),
      Number(tip),
      ...this.defaultDataInput.slice(index + 1),
    ];

    // Update inputs

    this.#store.dispatch(
      new UpdateEditCard(
        this.updateCard('preset_payment_sizes', this.defaultDataInput)
      )
    );
  }

  isSwitcher(key: number, state: boolean) {
    switch (key) {
      case 1:
        this.rate = state;
        this.#store.dispatch(
          new UpdateEditCard(this.updateCard('rating', state))
        );
        break;
      case 2:
        this.feedback = state;
        this.#store.dispatch(
          new UpdateEditCard(this.updateCard('reviews', state))
        );
        break;
      case 3:
        this.impression = state;
        this.#store.dispatch(
          new UpdateEditCard(this.updateCard('smiles', state))
        );
        break;
    }
  }

  clickOn() {
    // отправляем в сервис клик по кнопке с ее идентификатором "3".
    this.#btnService.clickOnButton(this.btnText.id);
  }

  updateCard(key: string, value: any) {
    // return (this.newCard = { ...this.newCard, [key]: value });
    return { key, value };
  }

  // toast() {
  //   console.log('click');

  //   this.#toast.success('Hello world!', 'Toastr fun!');
  // }
}
