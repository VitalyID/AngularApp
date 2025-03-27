import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserSetButtonService } from '../../../components/QR-CodeCreator/services/userSetUpTips.service';
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
  @Output() isValid = new EventEmitter();

  isCurrency?: string;

  readonly #fb = inject(FormBuilder);
  readonly #btnTipsService = inject(UserSetButtonService);

  myForm: FormControl = this.#fb.control('');

  ngOnInit(): void {
    if (this.dataToInput.validation === true) {
      this.myForm = this.#fb.control(this.dataToInput.value, [
        CustomRangeValidator('0', '1000'),
        Validators.min(1),
      ]);
    }

    this.myForm.valueChanges.subscribe((value) => {
      const userNumber = Number(value);

      const valueInput = {
        [this.dataToInput.inputID]: userNumber,
      };
      console.log(valueInput);
      console.log(typeof valueInput['keys']);

      this.#btnTipsService.getTipsFromInput(valueInput);

      // err validations
      if (this.myForm.hasError('rangeErr')) {
        this.myForm.setValue(1000);
      }

      this.isValid.emit({ [this.dataToInput.inputID]: this.myForm.value });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // setUp text to btn, after loading page (input=none)

    if (changes['dataToInput']) {
      const newValue = changes['dataToInput'].currentValue.placeholder;
      this.#btnTipsService.getTipsFromInput({
        [this.dataToInput.inputID]: newValue,
      });

      if (changes['dataToInput'].currentValue.value) {
        this.myForm.setValue(this.dataToInput.value);
      }
    }
  }
}
