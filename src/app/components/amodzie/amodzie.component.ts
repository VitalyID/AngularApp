import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AmodzieSettings } from './types/interfaces/amodzieSettings';

@Component({
  selector: 'amodzie',
  imports: [],
  templateUrl: './amodzie.component.html',
  styleUrl: './amodzie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmodzieComponent {
  arrImg: AmodzieSettings[] = [
    {
      path: '../../../assets/images/Slightly Smiling Face.png',
      grade: 1,
    },
    {
      path: '../../../assets/images/Smiling Face with Smiling Eyes.png',
      grade: 2,
    },
    {
      path: '../../../assets/images/Smiling Face with Heart-Eyes.png',
      grade: 3,
    },
    {
      path: '../../../assets/images/darkGlasses.png',
      grade: 4,
    },
    {
      path: '../../../assets/images/bad.png',
      grade: 5,
    },
  ];

  gradeActive: number = 3;

  onClick(data: number): void {
    this.gradeActive = data;
  }
}
