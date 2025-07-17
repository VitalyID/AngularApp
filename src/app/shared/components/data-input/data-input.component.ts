import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ButtonConfig } from '../../../types/interfaces/sectionItem';
import { ButtonsComponent } from '../buttons/buttons.component';
import { ButtonService } from '../buttons/service/buttons.component.service';
import { switchOnService } from './services/switchOnInput';

export function customValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateFrom = new Date(control.parent?.get('dateFrom')?.value);
    const dateEnd = new Date(control.value);

    const dateNow = new Date();
    const data = new Date();
    const timeZone = data.getTimezoneOffset() * 60 * 1000;
    const dateNowOffTimeZone = dateNow.getTime() - timeZone;

    if (dateFrom.getTime() > dateNowOffTimeZone) {
      return { dateEndInvalid: true };
    }

    if (dateFrom > dateEnd) {
      return { dateEndInvalid: true };
    }
    return null;
  };
}
@Component({
  selector: 'data-input',
  imports: [ReactiveFormsModule, CommonModule, ButtonsComponent],
  templateUrl: './data-input.component.html',
  styleUrl: './data-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataInputComponent implements OnInit, OnDestroy {
  @Input() dateForBTN!: ButtonConfig;

  readonly #buttonService = inject(ButtonService);
  readonly #fb = inject(FormBuilder);
  readonly #destroyRef = inject(DestroyRef);
  readonly #switchInputService = inject(switchOnService);
  readonly myInputForm = this.#fb.group({
    dateFrom: [
      { value: '', disabled: true },
      [Validators.required, customValidator()],
    ],
    dateEnd: [
      { value: '', disabled: true },
      [Validators.required, customValidator()],
    ],
  });

  #statusValidDataStart!: Subscription | undefined;

  ngOnInit(): void {
    this.#switchInputService.eventChangeInput$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        if (data === true) {
          this.myInputForm.get('dateFrom')?.enable();
        }
      });

    this.#statusValidDataStart = this.myInputForm
      .get('dateFrom')
      ?.statusChanges.subscribe((status) => {
        if (status === 'VALID') {
          this.myInputForm.get('dateEnd')?.enable();
        } else {
          this.myInputForm.get('dateEnd')?.disable();
        }
      });

    this.myInputForm
      .get('dateEnd')
      ?.statusChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((status) => {
        const enableBTN: ButtonConfig = {
          id: this.dateForBTN.id,
          disabled: status !== 'VALID',
        };

      });
  }

  onClick() {
    this.#buttonService.transmitData(this.myInputForm.value);
  }

  ngOnDestroy(): void {
    if (this.#statusValidDataStart) {
      this.#statusValidDataStart?.unsubscribe();
    }
  }
}
