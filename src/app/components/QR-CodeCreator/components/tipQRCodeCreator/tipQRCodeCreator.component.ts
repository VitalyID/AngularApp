import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { RoutIDservice } from '../../../../services/transmitDataRout.service';
import { ButtonsComponent } from '../../../../shared/components/buttons/buttons.component';
import { ColorPickerComponent } from '../../../../shared/components/color-picker/color-picker.component';
import { InputUserTipsComponent } from '../../../../shared/components/input-user-tips/input-user-tips.component';
import { PlaceholderTips } from '../../../../shared/components/input-user-tips/types/enum/placeholderTips';
import { DataInput } from '../../../../shared/components/input-user-tips/types/interfaces/dataInput';
import { SwitcherComponent } from '../../../../shared/components/switcher/switcher.component';
import { UploadLogoComponent } from '../../../../shared/components/upload-logo/upload-logo.component';
import { ButtonData } from '../../../../types/sectionItem';
import { EnumSwitcher } from '../../types/enum/enumSwitcher';
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

  dataToInputChild: DataInput[] = [
    {
      placeholder: PlaceholderTips.placeholder1,
      inputID: 'inputID-1',
      validation: true,
      unitCurrency: 'rub',
      validationFrom: '0',
      validationTo: '1000',
      value: '',
    },
    {
      placeholder: PlaceholderTips.placeholder2,
      inputID: 'inputID-2',
      validation: true,
      unitCurrency: 'rub',
      validationFrom: '0',
      validationTo: '1000',
      value: '',
    },
    {
      placeholder: PlaceholderTips.placeholder3,
      inputID: 'inputID-3',
      validation: true,
      unitCurrency: 'rub',
      validationFrom: '0',
      validationTo: '1000',
      value: '',
    },
  ];

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

  inValid(data: {}) {
    this.isValidInput = data ? true : false;
    this.#cdr.detectChanges();
  }
}
