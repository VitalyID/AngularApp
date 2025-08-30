import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { ListDropdown } from '../../shared/components/dropdown/types/interface/listDropdown';
import { ButtonConfig } from '../../types/interfaces/sectionItem';
import { PopupService } from '../../services/popup.service';
import { StepperComponent } from '../../shared/components/stepper/stepper.component';
import { RegistrationFormComponent } from '../../shared/components/restration-form/registration-form.component';
import { RegistrationTypeComponent } from '../../shared/components/registration-type/registration-type.component';
import { RegistrationCardComponent } from '../../shared/components/registration-card/registration-card.component';

@Component({
  selector: 'main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #popupService = inject(PopupService);

  parent: string = 'main';

  public btnText: ButtonConfig = {
    text: 'Создать QR-Code',
    iconClass: 'icon-add-outline',
    disabled: false,
  };

  popupText: string = 'Модалка!';

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

  ngOnInit(): void {
    this.#popupService.popupState$.next({
      titlePopUp: 'Идентификация аккаунта',
      name: 'registrationUser',
      state: true,
      component: StepperComponent,
      componentProps: [
        RegistrationFormComponent,
        RegistrationTypeComponent,
        RegistrationCardComponent,
      ],
    });
  }

  goToCreateQrPage() {
    this.#router.navigate(['/create-qrcode']);
  }
}
