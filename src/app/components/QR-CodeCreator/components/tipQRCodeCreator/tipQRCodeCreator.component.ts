import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { provideNgxMask } from 'ngx-mask';
import { Observable } from 'rxjs';
import { RoutIDservice } from '../../../../services/transmitDataRout.service';
import { ButtonsComponent } from '../../../../shared/components/buttons/buttons.component';
import { ColorPickerComponent } from '../../../../shared/components/color-picker/color-picker.component';
import { DefaultColor } from '../../../../shared/components/color-picker/types/enum/default';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { DataInput } from '../../../../shared/components/input-text/types/interfaces/dataInput';
import { SwitcherComponent } from '../../../../shared/components/switcher/switcher.component';
import { UploadLogoComponent } from '../../../../shared/components/upload-logo/upload-logo.component';
import { ButtonData } from '../../../../types/sectionItem';
import {
  AddUploadLogo,
  AddUserColor,
  AddUserTips,
} from '../../state/qr-code-creator.action';
import { InputUsers } from '../../types/interface/inputUsers';
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

  asideID: number = 0;
  isValidInput: boolean = false;
  isOpen: boolean = false;
  isClose: boolean = true;
  feedbackOpen: boolean = false;
  feedbackClose: boolean = true;
  // listSwitchKeys: (keyof typeof EnumSwitcher)[] = [];
  listSwitchKeys = Object.keys(EnumSwitcher);

  enumSwitcher = EnumSwitcher;

  userSettingData: any = {};
  myForm!: FormGroup;
  inputFromStore$?: Observable<InputUsers>;
  // #placeholder?: Subscription;
  colorSubstrate: string = '';
  colorBtn: string = '';

  defaultDataInput: InputUsers = {
    'inputID-1': 100,
    'inputID-2': 150,
    'inputID-3': 200,
  };

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

  readonly #routeService = inject(RoutIDservice);
  readonly #route = inject(ActivatedRoute);
  // readonly #cdr = inject(ChangeDetectorRef);
  readonly #store = inject(Store);
  // readonly #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.listItemSwitch();

    // here is control to active menu on aside-bar
    this.asideID = this.#route.snapshot.data['asideID'];
    this.#routeService.getIDroute(this.asideID);
  }

  listItemSwitch() {
    for (let item of Object.keys(EnumSwitcher)) {
      this.listSwitchKeys.push(item as keyof typeof EnumSwitcher);
    }
  }

  onClickSubstrate(data: string) {
    this.colorSubstrate = data;
    console.log(1, '-', this.colorSubstrate, 2, '-', this.colorBtn);
    this.userSetColor(this.colorSubstrate, this.colorBtn);
  }

  onClickColorBTN(data: string) {
    this.colorBtn = data;
    console.log(1, '-', this.colorSubstrate, 2, '-', this.colorBtn);
    this.userSetColor(this.colorBtn, this.colorSubstrate);
  }

  userSetColor(btn: string, substrate: string) {
    this.#store.dispatch(new AddUserColor(substrate, btn));
  }

  uploadLogo(data: string) {
    this.#store.dispatch(new AddUploadLogo(data));
  }

  SendDataStore(handleTip: keyof InputUsers, data: number) {
    this.defaultDataInput = { ...this.defaultDataInput, [handleTip]: data };
    this.#store.dispatch(new AddUserTips(this.defaultDataInput));
  }
}
