import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function letterNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return /[^a-zA-Zа-яА-Я]/.test(control.value) && control.value.length >= 3
      ? { numbersInName: true }
      : null;
  };
}
