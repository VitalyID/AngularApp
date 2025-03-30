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
import { Observable, Subscription } from 'rxjs';
import { RoutIDservice } from '../../../../services/transmitDataRout.service';
import { ButtonsComponent } from '../../../../shared/components/buttons/buttons.component';
import { ColorPickerComponent } from '../../../../shared/components/color-picker/color-picker.component';
import { InputUserTipsComponent } from '../../../../shared/components/input-user-tips/input-user-tips.component';
import { DataInput } from '../../../../shared/components/input-user-tips/types/interfaces/dataInput';
import { SwitcherComponent } from '../../../../shared/components/switcher/switcher.component';
import { UploadLogoComponent } from '../../../../shared/components/upload-logo/upload-logo.component';
import { ButtonData } from '../../../../types/sectionItem';
import {
  AddUploadLogo,
  AddUserSubstrateColor,
  AddUserTips,
} from '../../state/qr-code-creator.action';
import { EnumSwitcher } from '../../types/enum/enumSwitcher';
import { InputUsers } from '../../types/interface/inputUsers';
import { UserPreviewComponent } from '../tipPagePreview/tipPagePreview.component';
@Component({
  selector: 'create-qrcode',
  imports: [
    ReactiveFormsModule,
    SwitcherComponent,
    ColorPickerComponent,
    UploadLogoComponent,
    InputUserTipsComponent,
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
  #placeholder?: Subscription;

  defaultDataInput: InputUsers = {
    'inputID-1': 100,
    'inputID-2': 150,
    'inputID-3': 200,
  };

  inputSmallTip: DataInput = {
    inputID: 'inputID-1',
    validation: true,
    unitCurrency: 'rub',
    validationFrom: '0',
    validationTo: '1000',
    value: '',
    placeholder: '100',
  };

  inputMiddleTip: DataInput = {
    inputID: 'inputID-2',
    validation: true,
    unitCurrency: 'rub',
    validationFrom: '0',
    validationTo: '1000',
    value: '',
    placeholder: '150',
  };

  inputBigTip: DataInput = {
    placeholder: '200',
    inputID: 'inputID-3',
    validation: true,
    unitCurrency: 'rub',
    validationFrom: '0',
    validationTo: '1000',
    value: '',
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

  dataFromInput(data: InputUsers) {
    // console.log('Пришли данные от дочернего инпута: ', data);
    this.defaultDataInput = { ...this.defaultDataInput, ...data };
    // console.log('Новый объект: ', this.defaultDataInput);
    this.#store.dispatch(new AddUserTips(this.defaultDataInput));
  }

  userSetColor(data: string) {
    this.#store.dispatch(new AddUserSubstrateColor(data));
  }

  uploadLogo(data: string) {
    this.#store.dispatch(new AddUploadLogo(data));
  }

  userBTNcolor(data: string) {
    console.log(data);
  }
}
