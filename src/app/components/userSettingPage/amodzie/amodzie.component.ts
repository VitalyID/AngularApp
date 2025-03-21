import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetGradeActive } from '../create-qrcode/state/amodzie.action';
import { AmodzieState } from '../create-qrcode/state/amodzie.state';
import { AmodzieSettings } from './types/interfaces/amodzieSettings';

@Component({
  selector: 'amodzie',
  imports: [],
  templateUrl: './amodzie.component.html',
  styleUrl: './amodzie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmodzieComponent implements OnInit {
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

  readonly #store = inject(Store);
  readonly #cdr = inject(ChangeDetectorRef);

  gradeActive$: Observable<number> = this.#store.select(
    AmodzieState.getGradeActive
  );

  ngOnInit(): void {
    this.gradeActive$.subscribe((gradeActive) => {
      console.log('Grade Active (from store):', gradeActive); // Логирование
      this.#cdr.markForCheck(); // Уведомляем Angular о необходимости проверки изменений
    });
  }
  onClick(data: number): void {
    this.gradeActive = data;
    console.log('onClick called with data:', data);
    this.#store.dispatch(new SetGradeActive(this.gradeActive));
  }
}
