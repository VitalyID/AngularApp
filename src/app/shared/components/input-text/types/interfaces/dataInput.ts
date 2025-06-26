// import { Validation } from './dataInput';
// placeholder: this field present text, which is visible as placeholder
// inputID: Its ID for link on just input field (string);
// validation: 'yes' | 'no';
// unitCurrency: type currency. It work via ::before '₽' | '$' | 'none;
// value :the default means
// type : determinate  type data, which transmitted to child. It may be or number or string
// mask: we transmit template for mask (ngx-mask);
//   dropSpecialCharacters?: boolean - for using symbols by dash, brackets, spaces
// prefix need for mask, ex prefix phone

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
}
