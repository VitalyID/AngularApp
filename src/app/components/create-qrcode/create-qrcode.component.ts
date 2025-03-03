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
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { RoutIDservice } from '../../services/transmitDataRout.service';
import { SharedModule } from '../../shared.module';
import { SvgSpriteSetting } from '../../types/interfaces/svgIcon';
// import { UserSettingData } from '../../types/interfaces/userSettingData';
import { ButtonData } from '../../types/sectionItem';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { InputUserTipsComponent } from '../input-userTips/input-userTips.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SwitcherComponent } from '../switcher/switcher.component';
import { UploadLogoComponent } from '../upload-logo/upload-logo.component';
import { EnumSwitcher } from './types/enum/enumSwitcher';

@Component({
  selector: 'create-qrcode',
  imports: [
    ReactiveFormsModule,
    NgxMaskDirective,
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

  readonly #routeService = inject(RoutIDservice);
  readonly #route = inject(ActivatedRoute);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #render2 = inject(Renderer2);
  readonly #fb = inject(FormBuilder);

  asideID: number = 0;

  listSwitchKeys: (keyof typeof EnumSwitcher)[] = [];
  enumSwitcher = EnumSwitcher;
  listItemSwitch() {
    for (let item of Object.keys(EnumSwitcher)) {
      this.listSwitchKeys.push(item as keyof typeof EnumSwitcher);
    }
  }

  svgLogo: SvgSpriteSetting = {
    iconID: 'Logo',
    height: '40px',
    width: '200px',
  };

  UserSettingData: any = {};
  myForm!: FormGroup;

  // used it for changed new styles for switcher
  // newStyles: SwitcherStyles = {};

  btnText: ButtonData = {
    id: 7,
    text: 'Создать QR-код',
  };

  ngOnInit(): void {
    this.myForm = this.newForm();
    this.listItemSwitch();

    // here is control to active menu on aside-bar
    this.asideID = this.#route.snapshot.data['asideID'];
    this.#routeService.getDataRoute(this.asideID);
    this.#cdr.markForCheck();
    this.#cdr.detectChanges();
  }

  newForm(): FormGroup {
    return this.#fb.group({
      tipsArray: this.#fb.array([
        new FormControl('200'),
        new FormControl('250'),
        new FormControl('300'),
      ]),
    });
  }
  get tipsArray(): FormArray {
    return this.myForm.get('tipsArray') as FormArray;
  }

  // getTipsControl(): FormControl {
  //   return this.formGroup.get('tips') as FormControl;
  // }

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
}
