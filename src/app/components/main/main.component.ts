import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { ListDropdown } from '../../shared/components/dropdown/types/interface/listDropdown';
import { ButtonConfig } from './../../types/sectionItem';

@Component({
  selector: 'main',
  standalone: false,
  // imports: [TableComponent, ChartComponent, ButtonsComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  readonly #router = inject(Router);

  // asideID: number = 0;
  parent: string = 'main';

  public btnText: ButtonConfig = {
    text: 'Создать QR-Code',
    iconClass: 'icon-add-outline',
  };

  list: ListDropdown[] = [
    {
      id: uuidv4(),
      item: 'list1',
      icon: { iconID: 'star', width: '10px', height: '10px' },
    },
    {
      id: uuidv4(),
      item: 'list2',
      icon: { iconID: 'icon-share', width: '10px', height: '10px' },
    },
    {
      id: uuidv4(),
      item: 'list3',
      icon: { iconID: 'icon-loyalty', width: '10px', height: '10px' },
    },
  ];

  goToCreateQrPage() {
    this.#router.navigate(['/create-qrcode']);
  }
}
