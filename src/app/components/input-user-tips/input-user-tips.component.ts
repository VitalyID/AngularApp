import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserSetButtonService } from '../create-qrcode/components/services/userSetUpTips.service';
import { CustomRangeValidator } from './customVakidators/customRangeValidator';
import { DataInput } from './types/interfaces/dataInput';

@Component({
  selector: 'input-user-tips',
  imports: [ReactiveFormsModule],
  templateUrl: './input-user-tips.component.html',
  styleUrl: './input-user-tips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputUserTipsComponent implements OnInit, OnChanges {
  @Input() dataToInput: DataInput = {
    placeholder: '',
    inputID: '',
    value: '',
    unitCurrency: '',
  };

  isCurrency?: string;

  readonly #fb = inject(FormBuilder);
  readonly #btnTipsService = inject(UserSetButtonService);
  readonly #cdr = inject(ChangeDetectorRef);

  myForm: FormControl = this.#fb.control('');

  ngOnInit(): void {
    if (this.dataToInput.validation === true) {
      this.myForm = this.#fb.control(this.dataToInput.value, [
        CustomRangeValidator('0', '1000'),
      ]);
    }

    this.myForm.valueChanges.subscribe((value) => {
      const userNumber = Number(value);
      console.log('user ввел данные', userNumber);

      const valueInput = { [this.dataToInput.inputID]: userNumber };

      this.#btnTipsService.getTipsFromInput(valueInput);

      // err validations
      if (this.myForm.hasError('rangeErr')) {
        this.myForm.setValue(1000);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    let newValue = '';
    if (changes['dataToInput']) {
      console.log('ngOnChanges срабатывает');

      if (changes['dataToInput'].currentValue.value === '') {
        newValue = changes['dataToInput'].currentValue.value;
        console.log('плейсхлдер: ', newValue);

        console.log(this.dataToInput);
      }
      this.#cdr.detectChanges();
      this.#cdr.markForCheck();
      this.myForm.setValue(this.dataToInput);
    }
    // else {
    //     console.log('значение', changes['dataToInput'].currentValue.value);
    //     newValue = changes['dataToInput'].currentValue.value;
    //   }
    //   this.isCurrency = this.dataToInput.unitCurrency;
    //   // this.#btnTipsService.getTipsFromInput({
    //   //   [this.dataToInput.inputID]: newValue,
    //   // });
    // }
  }
}
