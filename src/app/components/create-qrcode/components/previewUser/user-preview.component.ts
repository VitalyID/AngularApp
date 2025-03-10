import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from '../../../../shared.module';
import { SvgSpriteSetting } from '../../../../types/interfaces/svgIcon';
import { ButtonData } from '../../../../types/sectionItem';
import { ButtonService } from '../../../buttons/service/buttons.component.service';
import { InputUserTipsComponent } from '../../../input-user-tips/input-user-tips.component';
import { SvgIconComponent } from '../../../svg-icon/svg-icon.component';
import { UploadTransmitPhotoService } from '../services/uploadTransmitPhoto.service';
import { UserSetButtonService } from '../services/userSetUpTips.service';
import { DataInput } from './../../../input-user-tips/types/interfaces/dataInput';

@Component({
  selector: 'user-preview',
  imports: [SvgIconComponent, InputUserTipsComponent, SharedModule],
  templateUrl: './user-preview.component.html',
  styleUrl: './user-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreviewComponent implements OnInit {
  @ViewChild('preview') previewIMG!: ElementRef;

  svgLogo: SvgSpriteSetting = {
    iconID: 'Logo',
    height: '40px',
    width: '200px',
  };

  setUpTips: DataInput = {
    placeholder: 'от 100 до 600',
    inputID: 'inputID-4',
    validation: true,
    unitCurrency: 'rub',
    value: '',
  };

  arrBTN: ButtonData[] = [
    {
      text: '0 ₽',
      background: '#EEEFF2',
      color: '#313436',
      id: 8,
      borderStyle: 'none',
    },
    {
      text: '0 ₽',
      background: '#EEEFF2',
      color: '#313436',
      id: 9,
      borderStyle: 'none',
    },
    {
      text: '0 ₽',
      background: '#EEEFF2',
      color: '#313436',
      id: 10,
      borderStyle: 'none',
    },
  ];

  userSettingData: any = {};

  readonly #logoService = inject(UploadTransmitPhotoService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #render2 = inject(Renderer2);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #setBTNService = inject(UserSetButtonService);
  readonly #btnService = inject(ButtonService);

  ngOnInit(): void {
    this.#logoService.getUserPhotoFromService$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        console.log('КОМОПНЕНТ ПОЛУЧИЛ ФОТО С СЕРВИСА: ', data);

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

        this.userSettingData.picture = data;
      });

    this.#setBTNService.channelDataInputTips$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        console.log('пришли данные с сервиса ', data);

        this.updateBTNtext(data);
      });

    // this.#btnService.eventClick$
    //   .pipe(takeUntilDestroyed(this.#destroyRef))
    //   .subscribe((data) => {
    //     let newValue = '';
    //     if (data.id === 8) {
    //       if (!this.arrBTN[0].text) return;

    //       this.setUpTips.value = this.arrBTN[0].text.split(' ')[0];
    //       this.setUpTips = { ...this.setUpTips, value: newValue };
    //       this.#cdr.detectChanges();
    //     } else if (data.id === 9) {
    //       if (!this.arrBTN[1].text) return;
    //       this.setUpTips.value = this.arrBTN[1].text.split(' ')[0];
    //       this.setUpTips = { ...this.setUpTips, value: newValue };
    //       this.#cdr.detectChanges();
    //     } else if (data.id === 10) {
    //       if (!this.arrBTN[2].text) return;
    //       this.setUpTips.value = this.arrBTN[2].text.split(' ')[0];
    //       this.setUpTips = { ...this.setUpTips, value: newValue };
    //       this.#cdr.detectChanges();
    //     }
    //   });
  }

  updateBTNtext(data: { [key: string]: number }) {
    const key = Object.keys(data);

    switch (key[0]) {
      case 'inputID-1':
        this.arrBTN[0].text = String(data[key[0]]) + ' ₽';
        break;
      case 'inputID-2':
        this.arrBTN[1].text = String(data[key[0]]) + ' ₽';
        break;
      case 'inputID-3':
        this.arrBTN[2].text = String(data[key[0]]) + ' ₽';
        break;
    }
    this.#cdr.detectChanges();
  }
}
