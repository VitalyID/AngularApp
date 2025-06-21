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
import { ButtonsComponent } from '../../../../shared/components/buttons/buttons.component';
import { ColorPickerComponent } from '../../../../shared/components/color-picker/color-picker.component';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { SwitcherComponent } from '../../../../shared/components/switcher/switcher.component';
import { UploadLogoComponent } from '../../../../shared/components/upload-logo/upload-logo.component';
import { ButtonConfig } from '../../../../types/interfaces/sectionItem';
import {
  InputConfig,
  InputValidation,
} from './../../../../shared/components/input-text/types/interfaces/dataInput';
import { ListOfCards, UserCard } from './../../../../state/cards.state';
// import { InputUsers } from '../../types/interface/inputUsers';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import * as uuid from 'uuid';
import {
  PostCard,
  PutCard,
  UpdateEditCard,
} from '../../../../state/cards.action';
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

  // editCart - it's a flag, which denote about this card: editing it now or no
  editCard: boolean = false;

  inputBaseTip: Signal<InputConfig> = computed(() => ({
    unitCurrency: 'rub',
    value: '',
    placeholder: '',
    type: 'number',
    disabled: false,
  }));

  inputSmallTip: Signal<InputConfig> = computed(() => ({
    ...this.inputBaseTip(),
    placeholder: this.card()?.preset_payment_sizes[0].toString(),
  }));

  inputMiddleTip: Signal<InputConfig> = computed(() => ({
    ...this.inputBaseTip(),
    placeholder: this.card()?.preset_payment_sizes[1].toString(),
  }));

  inputBigTip: Signal<InputConfig> = computed(() => ({
    ...this.inputBaseTip(),
    placeholder: this.card()?.preset_payment_sizes[2].toString(),
  }));

  validation: InputValidation = {
    validationFrom: '0',
    validationTo: '1000',
  };

  btnText: string = 'Создать QR-код';

  arrBTN: ButtonConfig[] = [
    {
      text: '100 ₽',
      background: '#EEEFF2',
      color: '#313436',
      id: uuid.v4(),
      borderStyle: 'none',
    },
    {
      text: '150 ₽',
      background: '#EEEFF2',
      color: '#313436',
      id: uuid.v4(),
      borderStyle: 'none',
    },
    {
      text: '200 ₽',
      background: '#EEEFF2',
      color: '#313436',
      id: uuid.v4(),
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
    // platform_id: '',
    preset_payment_sizes: [0, 0, 0],
    qr_image: '',
    rating: false,
    reviews: false,
    smiles: false,
  };

  // transmit state switcher to component (true/false) by Signal
  isOnRate: Signal<boolean> = computed(() => this.card()?.rating);
  isOnFeedback: Signal<boolean> = computed(() => this.card()?.reviews);
  isOnImpressions: Signal<boolean> = computed(() => this.card()?.smiles);

  readonly #store = inject(Store);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  card: Signal<UserCard> = this.#store.selectSignal(ListOfCards.getEditCard);

  defaultDataInput: number[] = [
    this.card()?.preset_payment_sizes[0],
    this.card()?.preset_payment_sizes[1],
    this.card()?.preset_payment_sizes[2],
  ];

  ngOnInit() {
    this.#store.dispatch(
      new UpdateEditCard(this.updateCard('logo_file_id', 0))
    );
  }

  createEditCard() {
    const id = this.#route.snapshot.paramMap.get('id');

    if (id) {
      this.#store.dispatch(new PutCard(this.card()));
    } else {
      this.#store.dispatch(new PostCard(this.card()));
    }
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

  updateCard(key: string, value: any) {
    return { key, value };
  }
}
