import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface ListLanguage {
  flagUrl: string;
  title: string;
}

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss',
})
export class LanguageComponent implements OnInit {
  @Output() languageChange = new EventEmitter<string>();

  selectedLanguage: string = 'RU';

  language: ListLanguage[] = [
    { flagUrl: '/assets/images/ru.png', title: 'RU' },
    { flagUrl: '../../../assets/images/en.png', title: 'EN' },
  ];

  ngOnInit(): void {
    this.languageChange.emit(this.selectedLanguage);
  }
  onLanguageChange(event: any): void {
    this.selectedLanguage = event.target.value;
    this.languageChange.emit(this.selectedLanguage);
  }
}
