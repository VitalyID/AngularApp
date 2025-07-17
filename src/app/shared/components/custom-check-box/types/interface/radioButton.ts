export interface RadioButtons {
  icon: string;
  iconActive: string;
  button: radioButtonConfig[];
}

export interface radioButtonConfig {
  name: string;
  checked: boolean;
  id: string;
}
