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
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
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
    placeholder: '200',
    inputID: 'inputID-1',
    value: '',
    unitCurrency: '',
  };

  @Output() dataFromInput = new EventEmitter();

  isCurrency?: string;

  readonly #fb = inject(FormBuilder);

  myForm: FormControl = this.#fb.control('');

  ngOnInit(): void {
    if (this.dataToInput.validation === true) {
      this.myForm = this.#fb.control(this.dataToInput.value);
    }

    this.myForm.valueChanges.subscribe((value) => {
      const userNumber = Number(value);
      const valueInput = { [this.dataToInput.inputID]: userNumber };
      this.dataFromInput.emit(valueInput);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataToInput']) {
      const newValue = changes['dataToInput'].currentValue.value;
      this.myForm.setValue(newValue);
      this.isCurrency = this.dataToInput.unitCurrency;
    }
  }
}
