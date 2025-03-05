import { AbstractControl, ValidatorFn } from '@angular/forms';

export function CustomRangeValidator(
  rangeFrom: string,
  rangeTo: string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputValue = Number(control.value);
    const numberFrom = Number(rangeFrom);
    const numberTo = Number(rangeTo);

    if (inputValue >= numberFrom && inputValue <= numberTo) {
      return null;
    } else {
      const errorObject: { [key: string]: any } = {
        rangeErr: { min: rangeFrom, max: rangeTo, actual: inputValue },
      };

      console.log(errorObject);
      return errorObject;
    }
  };
}
