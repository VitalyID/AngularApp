import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { RoutIDservice } from '../../services/transmitDataRout.service';
import { DefaultColor } from '../../shared/components/color-picker/types/enum/default';
import { ButtonData } from '../../types/sectionItem';
import { SetColor } from './state/agents.actions';
import { ColorPickerStore } from './state/agents.state';

@Component({
  selector: 'agents',
  standalone: false,
  // imports: [ButtonsComponent],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentsComponent implements OnInit {
  asideID: number = 0;
  btnText: ButtonData = {
    text: 'Создать QR-Code',
    iconClass: 'icon-add-outline',
    id: 12,
  };
  getColor$?: Observable<string>;
  #color?: Subscription;
  defaultColor: string = DefaultColor.color;

  readonly #routeService = inject(RoutIDservice);
  readonly #route = inject(ActivatedRoute);
  readonly #store = inject(Store);
  readonly #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.asideID = this.#route.snapshot.data['asideID'];
    this.#routeService.getIDroute(this.asideID);

    this.getColor$ = this.#store.select(ColorPickerStore.getColor);
    this.#color = this.getColor$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        console.log('Со стора пришли данные: ', data);
      });
  }

  userSetColor(data: string) {
    console.log('Юзер выбрал цвет: ', data);
    this.#store.dispatch(new SetColor(data));
  }
}
