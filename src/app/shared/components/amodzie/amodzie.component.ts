import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngxs/store';
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
  @Input() amodzieParentData: AmodzieData = {
    rate: 0,
    readonly: false,
  };
  @Output() dataFromAmodzieChild = new EventEmitter();

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

  readonly #store = inject(Store);
  readonly #cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['amodzieParentData']) {
      this.gradeActive = this.amodzieParentData.rate;
      console.log(this.amodzieParentData);
    }
  }

  onClick(data: number): void {
    if (this.amodzieParentData.readonly === true) return;

    this.gradeActive = data;
    this.dataFromAmodzieChild.emit(this.gradeActive);
    // console.log('onClick called with data:', data);
    // this.#store.dispatch(new AddUserAmodzie(data));
  }
}
