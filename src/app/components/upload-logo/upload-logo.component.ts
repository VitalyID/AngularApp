import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from '../../shared.module';
import { ButtonService } from '../buttons/service/buttons.component.service';
import { ButtonData } from './../../types/sectionItem';

@Component({
  selector: 'upload-logo',
  imports: [SharedModule],
  templateUrl: './upload-logo.component.html',
  styleUrl: './upload-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadLogoComponent implements AfterViewInit, OnInit {
  @ViewChild('fileInput') input?: ElementRef;
  @ViewChild('customInput') customInput?: ElementRef;
  @Output() uploadedFile = new EventEmitter<File>();

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

  ngOnInit(): void {
    this.#clickOnBTN.eventClick$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        if (data.id === 6) {
          console.log('Click on Input');

          this.input?.nativeElement.click();
        }
      });
  }

  ngAfterViewInit(): void {
    // console.log(this.input);
  }

  openFile() {
    const file = this.input?.nativeElement.files[0];
    // console.log(typeof file);

    console.log(file);
    if (file) {
      this.uploadedFile.emit(file);
    }
  }
}
