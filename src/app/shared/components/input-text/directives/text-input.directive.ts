import { Directive, HostListener, Input } from '@angular/core';
import { InputValidation } from '../types/interfaces/dataInput';

@Directive({
  selector: '[appMyValidator]',
  standalone: true,
})
export class myValidatorDirective {

  @Input() type: 'number' | 'text' | 'tel' | 'password' = 'text';
  @Input() placeholder: string = '';

  @Input() validationSettings: InputValidation = {
    validationFrom: '',
    validationTo: '',
  };


  @HostListener('input', ['$event'])
  onInput(event: any) {
    const inputValue = event.target.value;

    if (this.type === 'number') {
      if (!this.validationSettings?.validationFrom) return;
      if (!this.validationSettings?.validationTo) return;

      if (
        Number(inputValue) < Number(this.validationSettings.validationFrom) ||
        Number(inputValue) > Number(this.validationSettings.validationTo)
      ) {
        event.target.value = this.placeholder;
      }
    }
  }
}
