import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSetButtonService } from '../../../components/QR-CodeCreator/services/userSetUpTips.service';
import { myValidatorDirective } from './directives/text-input.directive';
import { DataInput } from './types/interfaces/dataInput';

@Component({
  selector: 'input-text',
  imports: [ReactiveFormsModule, myValidatorDirective],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent implements OnChanges {
  @Input() actualData: DataInput = {
    placeholder: '',
    // inputID: '',
    value: '',
    unitCurrency: '',
    type: 'text',
    disabled: false,
  };
  @Output() userInput = new EventEmitter();

  isCurrency?: string;

  readonly #btnTipsService = inject(UserSetButtonService);

  ngOnChanges(changes: SimpleChanges): void {
    // setUp text to btn, after loading page (input=none)

    if (changes['actualData']) {
      this.isCurrency = this.actualData.unitCurrency;

      // const newValue = changes['dataToInput'].currentValue.value;
      this.#btnTipsService.getTipsFromInput({});
    }
  }

  inputValue(data: Event) {
    const target = data.target as HTMLInputElement;
    console.log(target.value);
    this.userInput.emit(target.value);
  }
}
