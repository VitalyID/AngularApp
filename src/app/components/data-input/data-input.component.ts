import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
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
import { SharedModule } from '../../shared.module';
import { ListenerService } from '../buttons/service/buttonListenerStatus.compoent.service';
import { ButtonData } from './../../types/sectionItem';
import { ButtonService } from './../buttons/service/buttons.component.service';
import { switchOnService } from './services/switchOnInput';

export function customValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let dateFrom = new Date(control.parent?.get('dateFrom')?.value);
    const dateEnd = new Date(control.value);

    const dateNow = new Date();
    let data = new Date();
    const timeZone = data.getTimezoneOffset() * 60 * 1000;
    const dateNowOffTimeZone = dateNow.getTime() - timeZone;

    if (dateFrom.getTime() > dateNowOffTimeZone) {
      return { dateEndInvalid: true };
    }

    if (dateFrom > dateEnd) {
      return { dateEndInvalid: true };
    } else {
      // console.log('Ошибки дат нет');
    }
    return null;
  };
}
@Component({
  selector: 'data-input',
  imports: [SharedModule, ReactiveFormsModule, CommonModule],
  templateUrl: './data-input.component.html',
  styleUrl: './data-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataInputComponent implements OnInit, OnDestroy {
  readonly #buttonService = inject(ButtonService);
  readonly #fb = inject(FormBuilder);
  readonly #switchInputService = inject(switchOnService);
  readonly #listenerBTNservice = inject(ListenerService);
  #statusValidDataStart!: Subscription | undefined;
  #valueChangesSubscription!: Subscription;

  @Input() dateForBTN!: ButtonData;
  // btnText2: ButtonData = this.dateForBTN;
  // public buttonData: ButtonData = this.dateForBTN;

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

  ngOnInit(): void {
    // this.btnText2 = this.dateForBTN;
    // this.btnText2 = this.dateForBTN;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['dateForBTN']) {
  //     this.btnText2 = this.dateForBTN;
  //   }
  //   if (changes['clickSubscription']) console.log(222222);
  // }

  constructor() {
    // принимаем клик с сервиса btn
    this.#buttonService.eventClick$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        if (data.id === 2) {
          console.log('Кнопка нажата с ID:', data.id);

          this.#buttonService.transmitData(this.myInputForm.value);
        }
      });

    // Enabled/Disabled dateFrom start
    this.#switchInputService.eventChangeInput$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        console.log(data);
        if (data == true) {
          this.myInputForm.get('dateFrom')?.enable();
          // this.myInputForm.get('dateEnd')?.enable();
        }
      });
    // Enabled/Disabled dateFrom end

    // Enabled/Disabled dateEnd start
    this.#statusValidDataStart = this.myInputForm
      .get('dateFrom')
      ?.statusChanges.subscribe((status) => {
        if (status === 'VALID') {
          this.myInputForm.get('dateEnd')?.enable();
        } else {
          this.myInputForm.get('dateEnd')?.disable();
        }
      });
    // Enabled/Disabled dateEnd end

    // this.#valueChangesSubscription;
    this.myInputForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        if (this.myInputForm.valid) {
          const enableBTN: ButtonData = {
            id: 2,
            disabled: false,
          };
          this.#listenerBTNservice.getStatusForBTN(enableBTN);
        } else {
          const enableBTN: ButtonData = {
            id: 2,
            disabled: true,
          };
          this.#listenerBTNservice.getStatusForBTN(enableBTN);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.#statusValidDataStart) {
      this.#statusValidDataStart?.unsubscribe();
    }
  }
}
