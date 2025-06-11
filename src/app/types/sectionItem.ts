export interface ButtonConfig {
  text?: string;
  iconClass?: string;
  disabled?: boolean;
  background?: string;
  color?: string;
  isActive?: boolean;
  id?: string;
  borderStyle?: string;
  borderRadius?: string;
  boxShadow?: string;
}

export interface DataUserOperation {
  [key: string]: any;
  data: string;
  country: string;
  tips: string;
  commission: string;
  email: string;
  card: string;
  id: string;
}

// Даты пользователя при клике на таб "За период"
export interface DateTimeUserOperations {
  dateFrom: string;
  dateEnd: string;
}
