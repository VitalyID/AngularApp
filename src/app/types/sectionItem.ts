export interface SectionItem {
  title: string;
  icon: string;
  ID: number;
}// button-data.interface.ts
export interface ButtonData {
  text: string;       // Текст для кнопки
  iconClass?: string; // Класс иконки (необязательный)
}

export interface ButtonClass {
  background ?: string,
  color ?: string
}

export interface DataUserOperation {
  'data': string,
  'country' : string,
  'tips': string,
  'commission': string,
  'email': string,
  'card': string
}
