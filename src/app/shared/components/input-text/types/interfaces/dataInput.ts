// placeholder: this field present text, which is visible as placeholder
// inputID: Its ID for link on just input field (string);
// validation: 'yes' | 'no';
// unitCurrency: type currency. It work via ::before '₽' | '$' | '';
// value :the default means
// type : determinate  type data, which transmitted to child. It may be or number or string

export interface DataInput {
  placeholder?: string;
  // inputID: string;
  validation?: boolean;
  validationFrom?: string;
  validationTo?: string;
  unitCurrency?: string;
  value: string;
  type: 'number' | 'text';
  disabled: boolean;
}
