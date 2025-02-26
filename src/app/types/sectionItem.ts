// Управление btn
// text -button text
// iconClass - class icon-fonts
// disabled - state of button
// background
// color?: string;
// id: id button for control press from service

export interface ButtonData {
  text?: string;
  iconClass?: string;
  disabled?: boolean;
  background?: string;
  color?: string;
  // type?: string;
  // event?: string;
  id: number;
}
export interface DataUserOperation {
  [key: string]: any;
  data: string;
  country: string;
  tips: string;
  commission: string;
  email: string;
  card: string;
}

// Даты пользователя при клике на таб "За период"
export interface DateTimeUserOperations {
  dateFrom: string;
  dateEnd: string;
}
