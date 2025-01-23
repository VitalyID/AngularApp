export interface SectionItem {
  title: string;
  icon: string;
  ID: number;
}

// Управление btn
export interface ButtonData {
  text: string;
  iconClass?: string;
  disabled?: boolean;
  background?: string;
  color?: string;
}

export interface ButtonDataInput {
  text: string;
  iconClass?: string;
  disabled?: boolean;
  background?: string;
  color?: string;
}

// Используется для передачи нового класса стилей btn
export interface ButtonClass {
  background?: string;
  color?: string;
}

export interface DataUserOperation {
  data: string;
  country: string;
  tips: string;
  commission: string;
  email: string;
  card: string;
}
