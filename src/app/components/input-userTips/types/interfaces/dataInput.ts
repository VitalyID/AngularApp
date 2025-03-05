// placeholder: this field present text, which is visible as placeholder
// type: indicate to type key-control on @HostListener ('string' | 'number');
// inputID: Its ID for link on just input field (string);
// validation: 'yes' | 'no';
// validFrom: the number, which is start for validations (number);
// validTo: the number, which is end for validations (number);
// unitCurrency: type currency. It work via ::before '₽' | '$' | '';

export interface DataInput {
  placeholder: string;
  type: 'string' | 'number';
  inputID: string;
  validation?: boolean;
  validFrom?: string;
  validTo?: string;
  unitCurrency?: '₽' | '$' | '';
  value: string;
}
