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
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { provideNgxMask } from 'ngx-mask';
import { Observable } from 'rxjs';
import { StateMenuService } from '../../../../services/state-menu';
import { RoutIDservice } from '../../../../services/transmitDataRout.service';
import { ButtonsComponent } from '../../../../shared/components/buttons/buttons.component';
import { ButtonService } from '../../../../shared/components/buttons/service/buttons.component.service';
import { ColorPickerComponent } from '../../../../shared/components/color-picker/color-picker.component';
import { DefaultColor } from '../../../../shared/components/color-picker/types/enum/default';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { DataInput } from '../../../../shared/components/input-text/types/interfaces/dataInput';
import { SwitcherComponent } from '../../../../shared/components/switcher/switcher.component';
import { UploadLogoComponent } from '../../../../shared/components/upload-logo/upload-logo.component';
import { ButtonData } from '../../../../types/sectionItem';
import { AsideComponent } from '../../../layouts/aside/aside.component';
import { ClickOutsideDirective } from '../../../layouts/aside/directives/click-outside.directive';
import { EscCloseDirective } from '../../../layouts/aside/directives/esc-close.directive';
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
    AsideComponent,
    EscCloseDirective,
    ClickOutsideDirective,
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
  // isOpen: boolean = false;
  isClose: boolean = true;
  feedbackOpen: boolean = false;
  feedbackClose: boolean = true;
  listSwitchKeys = Object.keys(EnumSwitcher);

  enumSwitcher = EnumSwitcher;

  userSettingData: any = {};
  myForm!: FormGroup;
  inputFromStore$?: Observable<InputUsers>;
  colorSubstrate: string = '';
  colorBtn: string = '';

  menuState: boolean = false;
  isShadow: boolean = false;

  // isOpen transmitted to Drectives for checking state component aside.
  // Component Aside is open after 1s, because its time need for animations
  isOpen: boolean = false;

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
  readonly #store = inject(Store);
  readonly #menuService = inject(StateMenuService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #btnService = inject(ButtonService);

  ngOnInit(): void {
    this.listItemSwitch();

    // here is control to active menu on aside-bar
    this.asideID = this.#route.snapshot.data['asideID'];
    this.#routeService.getIDroute(this.asideID);

    this.#menuService.stateMenuService
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        this.menuState = data;
        this.isShadow = data;

        if (data) {
          setTimeout(() => {
            this.isOpen = true;
            this.#cdr.detectChanges();
          }, 1000);
        }
      });
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

  clickOn() {
    // отправляем в сервис клик по кнопке с ее идентификатором "3".
    this.#btnService.clickOnButton(this.btnText.id);
  }

  onMenuClosed(data: boolean) {
    if (data) {
      this.menuState = false;
      this.isShadow = false;
      this.isOpen = false;
      this.#cdr.detectChanges();
    }
  }

  onMenuClosedByClick(data: boolean) {
    if (this.menuState) {
      this.menuState = false;
      this.isShadow = false;
      this.isOpen = false;
    }
  }
}
