import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DefaultColor } from '../../shared/components/color-picker/types/enum/default';
import { ButtonConfig } from '../../types/interfaces/sectionItem';
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
  btnText: ButtonConfig = {
    text: 'Создать QR-Code',
    iconClass: 'icon-add-outline',
  };
  getColor$?: Observable<string>;

  defaultColor: string = DefaultColor.color;

  readonly #store = inject(Store);

  ngOnInit(): void {
    this.getColor$ = this.#store.select(ColorPickerStore.getColor);
  }

  userSetColor(data: string) {
    // console.log('Юзер выбрал цвет: ', data);
    this.#store.dispatch(new SetColor(data));
  }
}
