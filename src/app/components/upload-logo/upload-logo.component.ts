import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from '../../shared.module';
import { ButtonService } from '../buttons/service/buttons.component.service';
import { UploadTransmitPhotoService } from '../create-qrcode/components/services/uploadTransmitPhoto.service';
import { ButtonData } from './../../types/sectionItem';

@Component({
  selector: 'upload-logo',
  imports: [SharedModule],
  templateUrl: './upload-logo.component.html',
  styleUrl: './upload-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadLogoComponent implements OnInit {
  @ViewChild('fileInput') input?: ElementRef;
  // @ViewChild('customInput') customInput?: ElementRef;
  // @Output() uploadedFile = new EventEmitter<File>();

  btnText: ButtonData = {
    iconClass: 'icon-icon-upload',
    id: 6,
    text: 'Загрузите логотип',
    background: 'none',
    color: '#313436',
    borderStyle: 'none',
    boxShadow: 'none',
  };

  readonly #clickOnBTN = inject(ButtonService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #transmitLogoService = inject(UploadTransmitPhotoService);

  ngOnInit(): void {
    this.#clickOnBTN.eventClick$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        if (data.id === 6) {
          this.input?.nativeElement.click();
        }
      });
  }
  openFile() {
    const file = this.input?.nativeElement.files[0];

    if (file) {
      this.#transmitLogoService.getPhotoFromComponent(file);
    }
  }
}
