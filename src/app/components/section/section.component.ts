import { Component, Input } from '@angular/core';
import { SectionItem } from './../../types/sectionItem';

@Component({
  selector: 'app-section',
  standalone: false,
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  @Input() item: SectionItem = {
    title: 'error name',
    icon: 'Error transmit child',
    ID: 999,
  };

  @Input() isActive?: boolean;
}
