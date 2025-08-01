export interface RadioButtons {
  icon: string;
  iconActive: string;
  button: RadioButtonConfig[];
}

export interface RadioButtonConfig {
  name: string;
  checked: boolean;
  id: string;
}
