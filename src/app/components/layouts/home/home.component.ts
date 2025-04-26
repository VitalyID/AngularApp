import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { StateMenuService } from '../../../services/state-menu';
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #menuService = inject(StateMenuService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly activeMenuItem: number[] = [6, 7, 8];

  // asideID?: number;
  // isShadow: boolean = false;
  // menuState: boolean = false;
  // isOpen: boolean = false;

  isShadow = signal<boolean>(false);
  menuState = signal<boolean>(false);
  isOpen = signal<boolean>(false);

  // parent: string = 'home';

  ngOnInit(): void {
    // this.asideID = this.#route.snapshot.data['asideID'];

    this.#menuService.stateMenuService
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        this.isShadow.set(data);
        this.menuState.set(data);
        this.#cdr.detectChanges();

        // wait stop animations. By CSS, animation take 1s of time
        if (data) {
          setTimeout(() => {
            this.isOpen.set(true);
            this.#cdr.detectChanges();
          }, 1000);
        }
      });
  }

  onMenuClose(data: boolean) {
    if (data) {
      this.menuState.set(false);
      this.isShadow.set(false);
      this.isOpen.set(false);
      // this.#cdr.detectChanges();
    }
  }

  // onMenuClosedByClick(data: boolean) {
  //   if (this.menuState) {
  //     this.menuState = false;
  //     this.isShadow = false;
  //     this.isOpen = false;
  //   }
  // }

  // добавляем класс только к элементам с этими id
  getClassForSectionItem(id: number): boolean {
    return this.activeMenuItem.indexOf(id) != -1;
  }
}
