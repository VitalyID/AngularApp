import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  // forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  // NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomRangeValidator } from '../data-input/customVakidators/customRangeValidator';
import { DataInput } from './types/interfaces/dataInput';

@Component({
  selector: 'input-userTips',
  imports: [ReactiveFormsModule],
  templateUrl: './input-userTips.component.html',
  styleUrl: './input-userTips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputUserTipsComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() dataToInput: DataInput = {
    placeholder: '200',
    type: 'number',
    inputID: 'inputID-1',
    value: '',
  };

  @Output() dataFromInput = new EventEmitter();
  @Output() inValid = new EventEmitter();

  // If user press wrong key, we  are intercept and stop it
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // validation by key-number
    if (this.dataToInput.type === 'number') {
      const correctKey = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '.',
        ',',
        'Backspace',
        'ArrowLeft',
        'ArrowRight',
        'Delete',
        'Tab',
      ];
      if (!correctKey.includes(event.key)) {
        event.preventDefault();
      }

      // validation by key-string
    } else if (this.dataToInput.type === 'string') {
      console.log('string');

      const forbiddenLetter = ['<', '>', ';', '"', "'", '\\'];
      if (forbiddenLetter.includes(event.key)) {
        event.preventDefault();
      }
    }
  }

  readonly #fb = inject(FormBuilder);
  readonly #render = inject(Renderer2);
  readonly #elfRef = inject(ElementRef);

  myForm: FormControl = this.#fb.control('');

  ngOnInit(): void {
    if (this.dataToInput.validation === true) {
      if (!this.dataToInput.validFrom) return;
      if (!this.dataToInput.validTo) return;

      this.myForm = this.#fb.control(
        this.dataToInput.value,
        CustomRangeValidator(
          this.dataToInput.validFrom,
          this.dataToInput.validTo
        )
      );
    }

    this.myForm.valueChanges.subscribe((value) => {
      const noValid = this.myForm.hasError('rangeErr');
      const errors = this.myForm.errors;
      // if (errors && errors['rangeErr']) {
      //   this.inValid.emit(errors['rangeErr']);
      // }
      this.inValid.emit(noValid);
    });

    this.myForm.valueChanges.subscribe((value) => {
      // console.log(value);
      const userNumber = Number(value);
      const valueInput = { [this.dataToInput.inputID]: userNumber };
      this.dataFromInput.emit(valueInput);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataToInput']) {
      const newValue = changes['dataToInput'].currentValue.value;
      this.myForm.setValue(newValue);
    }
  }

  ngAfterViewInit(): void {
    this.#render.setProperty(
      this.#elfRef.nativeElement,
      'style',
      `--content:"${this.dataToInput.unitCurrency}"`
    );
  }
}
