export interface SectionItem {
  title: string;
  icon: string;
  ID: number;
}

// Управление btn
export interface ButtonData {
  text?: string;
  iconClass?: string;
  disabled?: boolean;
  background?: string;
  color?: string;
  type?: string;
  event?: string;
  id: number;
}
export interface DataUserOperation {
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
