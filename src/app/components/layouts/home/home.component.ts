import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  Type,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { StateMenuService } from '../../../services/state-menu';
import { PopupComponent } from '../../../shared/components/pop-up/pop-up.component';
import { SpinnerService } from '../../../shared/components/spinner/serices/spinner.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { AsideComponent } from '../aside/aside.component';
import { ClickOutsideDirective } from '../aside/directives/click-outside.directive';
import { EscCloseDirective } from '../aside/directives/esc-close.directive';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeaderUserComponent,
    AsideComponent,
    RouterOutlet,
    CommonModule,
    EscCloseDirective,
    ClickOutsideDirective,
    SpinnerComponent,
    PopupComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly #menuService = inject(StateMenuService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly activeMenuItem: number[] = [6, 7, 8];
  readonly #spinner = inject(SpinnerService);

  isShadow = signal<boolean>(false);
  menuState = signal<boolean>(false);
  isOpen = signal<boolean>(false);
  overflow: string = 'auto';
  currentComponent: Type<any> = HomeComponent;

  // NOTE: newUser need for forbid to render popup when user is done. We get it true from PopUpService and 'close' from 'close popup click on latest step'
  newUser: boolean = false;

  spinnerState = toSignal(this.#spinner.spinnerState);

  ngOnInit(): void {
    this.#menuService.stateMenuService
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        this.isShadow.set(data);
        this.menuState.set(data);
        this.#cdr.detectChanges();

        // NOTE: wait stop animations. By CSS, animation take 1s of time
        if (data) {
          setTimeout(() => {
            this.isOpen.set(true);
            this.#cdr.detectChanges();
          }, 1000);
        }
      });

    this.#spinner.setContainer(HomeComponent);
  }

  onMenuClose(data: boolean) {
    if (data) {
      this.menuState.set(false);
      this.isShadow.set(false);
      this.isOpen.set(false);
    }
  }

  // NOTE: добавляем класс только к элементам с этими id
  getClassForSectionItem(id: number): boolean {
    return this.activeMenuItem.indexOf(id) !== -1;
  }

  userIsDone(data: boolean) {
    this.newUser = data;
  }
}
