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
import { SharedModule } from '../../../../shared.module';
import { ButtonData } from '../../../../types/sectionItem';
import { ColorPickerComponent } from '../../../color-picker/color-picker.component';
import { InputUserTipsComponent } from '../../../input-user-tips/input-user-tips.component';
import { DataInput } from '../../../input-user-tips/types/interfaces/dataInput';
import { StarsRateComponent } from '../../../stars-rate/stars-rate.component';
import { SvgIconComponent } from '../../../svg-icon/svg-icon.component';
import { SwitcherComponent } from '../../../switcher/switcher.component';
import { TextAreaComponent } from '../../../text-area/text-area.component';
import { UploadLogoComponent } from '../../../upload-logo/upload-logo.component';
import { EnumSwitcher } from '../../types/enum/enumSwitcher';
import { UserPreviewComponent } from '../previewUser/user-preview.component';

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
    UserPreviewComponent,
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
  // listSwitchKeys: (keyof typeof EnumSwitcher)[] = [];
  listSwitchKeys = Object.keys(EnumSwitcher);

  enumSwitcher = EnumSwitcher;
  userSettingData: any = {};
  myForm!: FormGroup;

  dataToInputChild: DataInput[] = [
    {
      placeholder: '100',
      inputID: 'inputID-1',
      validation: true,
      unitCurrency: 'rub',
      validationFrom: '0',
      validationTo: '1000',

      value: '',
    },
    {
      placeholder: '150',
      inputID: 'inputID-2',
      validation: true,
      unitCurrency: 'rub',
      validationFrom: '0',
      validationTo: '1000',
      value: '',
    },
    {
      placeholder: '200',
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
    this.#routeService.getDataRoute(this.asideID);
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
