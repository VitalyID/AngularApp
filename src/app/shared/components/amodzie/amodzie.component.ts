import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AmodzieSettings } from './types/interfaces/amodzieSettings';
import { AmodzieData } from './types/interfaces/amodzieStateData';

@Component({
  selector: 'amodzie',
  imports: [],
  templateUrl: './amodzie.component.html',
  styleUrl: './amodzie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmodzieComponent implements OnInit, OnChanges {
  @Input() amodzieSetting: AmodzieData = {
    rate: 0,
    readonly: false,
  };
  @Output() amodzieSelected = new EventEmitter();

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

  gradeActive: number = 1;

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['amodzieParentData']) {
      this.gradeActive = this.amodzieSetting.rate;
      console.log(this.amodzieSetting);
    }
  }

  onClick(data: number): void {
    if (this.amodzieSetting.readonly === true) return;

    this.gradeActive = data;
    this.amodzieSelected.emit(this.gradeActive);
  }
}
