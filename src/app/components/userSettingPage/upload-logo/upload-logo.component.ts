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
import { SharedModule } from '../../../shared.module';
import { ButtonData } from '../../../types/sectionItem';
import { ButtonService } from '../../buttons/service/buttons.component.service';
import { UploadTransmitPhotoService } from './services/uploadTransmitPhoto.service';

@Component({
  selector: 'upload-logo',
  imports: [SharedModule],
  templateUrl: './upload-logo.component.html',
  styleUrl: './upload-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadLogoComponent implements OnInit {
  @ViewChild('fileInput') input?: ElementRef;

  uploadPhoto: ButtonData = {
    iconClass: 'icon-icon-upload',
    id: 6,
    text: 'Загрузите логотип',
    background: 'none',
    color: '#313436',
    borderStyle: 'none',
    boxShadow: 'none',
  };

  readonly #dataFromButtonService = inject(ButtonService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #transmitLogoService = inject(UploadTransmitPhotoService);

  ngOnInit(): void {
    this.#dataFromButtonService.eventClick$
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
      this.#readFile(file);
    }
  }

  #readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.#transmitLogoService.getPhotoFromComponent(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}
