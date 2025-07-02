import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultColor } from '../../shared/components/color-picker/types/enum/default';
import { ButtonConfig } from '../../types/interfaces/sectionItem';


@Component({
  selector: 'agents',
  standalone: false,
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentsComponent {
  btnText: ButtonConfig = {
    text: 'Создать QR-Code',
    iconClass: 'icon-add-outline',
  };
  getColor$?: Observable<string>;

  defaultColor: string = DefaultColor.color;






}
