// NOTE: import { Validation } from './dataInput';
// NOTE: placeholder: this field present text, which is visible as placeholder
// NOTE: inputID: Its ID for link on just input field (string);
// NOTE: validation: 'yes' | 'no';
// NOTE: unitCurrency: type currency. It work via ::before '₽' | '$' | 'none;
// NOTE: value :the default means
// NOTE: type : determinate  type data, which transmitted to child. It may be or number or string
// NOTE: mask: we transmit template for mask (ngx-mask);
// NOTE: dropSpecialCharacters?: boolean - for using symbols by dash, brackets, spaces
// NOTE: prefix need for mask, ex prefix phone

export interface InputConfig {
  placeholder?: string;
  unitCurrency?: string;
  value?: string;
  type?: 'number' | 'text' | 'tel' | 'password';
  disabled?: boolean;
  mask?: string;
  prefix?: string;
  dropSpecialCharacters?: boolean;
}

export interface InputValidation {
  validation?: boolean;
  validationFrom?: string;
  validationTo?: string;
  minlength?: number;
}
