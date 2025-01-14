import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public headerLilnks: string[] = [
    'Получателям',
    'Бизнесу',
    'Плательщикам',
    'Агентам',
    'Поддержка',
  ];
}
