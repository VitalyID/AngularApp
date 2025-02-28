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
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { RoutIDservice } from '../../services/transmitDataRout.service';
import { SharedModule } from '../../shared.module';
import { SvgSpriteSetting } from '../../types/interfaces/svgIcon';
import { UserSettingData } from '../../types/interfaces/userSettingData';
import { ButtonData } from '../../types/sectionItem';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SwitcherComponent } from '../switcher/switcher.component';
import { UploadLogoComponent } from '../upload-logo/upload-logo.component';

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

  asideID: number = 0;
  title1 = 'rate';
  title2 = 'feedback';
  title3 = 'impressions';

  svgLogo: SvgSpriteSetting = {
    iconID: 'Logo',
    height: '40px',
  };

  UserSettingData: UserSettingData = {};

  // used it for changed new styles for switcher
  // newStyles: SwitcherStyles = {};

  btnText: ButtonData = {
    id: 7,
    text: 'Создать QR-код',
  };

  myForm = new FormGroup({
    tips1: new FormControl('150', Validators.pattern(/^[0-9]*$/)),
    tips2: new FormControl('200', Validators.pattern(/^[0-9]*$/)),
    tips3: new FormControl('250', Validators.pattern(/^[0-9]*$/)),
  });

  ngOnInit(): void {
    // here is control to active menu on aside-bar
    this.asideID = this.#route.snapshot.data['asideID'];
    this.#routeService.getDataRoute(this.asideID);
    this.#cdr.markForCheck();
    this.#cdr.detectChanges();
  }

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
