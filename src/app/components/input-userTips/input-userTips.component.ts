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
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  // NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { DataInput } from './types/interfaces/dataInput';

@Component({
  selector: 'input-userTips',
  imports: [ReactiveFormsModule],
  templateUrl: './input-userTips.component.html',
  styleUrl: './input-userTips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputUserTipsComponent implements OnInit, AfterViewInit {
  @Input() dataToInput: DataInput = {
    placeholder: '200',
    type: 'number',
    inputID: 'inputID-1',
  };
  @Output() dataFromInput = new EventEmitter();
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
      const forbiddenLetter = ['<', '>', ';', '"', "'", '\\'];
      if (!forbiddenLetter.includes(event.key)) {
        event.preventDefault();
      }
    }
  }

  myForm?: FormControl;

  readonly #fb = inject(FormBuilder);
  readonly #render = inject(Renderer2);
  readonly #elfRef = inject(ElementRef);

  ngOnInit(): void {
    const controlName = String(this.dataToInput.inputID);
    this.myForm = this.#fb.control({ name: '' });
  }

  ngAfterViewInit(): void {
    // console.log(this.placeholder);
    this.#render.setProperty(
      this.#elfRef.nativeElement,
      'style',
      `--content:"${this.dataToInput.unitCurrency}"`
    );
  }

  userInput(data: Event) {
    const userNumber = (data.target as HTMLInputElement).value;
    console.log(typeof userNumber);

    const valueInput = { [this.dataToInput.inputID]: Number(userNumber) };
    // console.log(valueInput);

    this.dataFromInput.emit(valueInput);
  }
}
