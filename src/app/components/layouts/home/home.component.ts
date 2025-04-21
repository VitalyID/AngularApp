import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
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

  asideID?: number;
  isShadow: boolean = false;
  menuState: boolean = false;
  isOpen: boolean = false;

  parent: string = 'home';

  ngOnInit(): void {
    this.asideID = this.#route.snapshot.data['asideID'];

    this.#menuService.stateMenuService
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        this.isShadow = data;
        this.menuState = data;
        this.#cdr.detectChanges();

        if (data) {
          setTimeout(() => {
            this.isOpen = true;
            this.#cdr.detectChanges();
          }, 1000);
        }
      });
  }

  onMenuClosed(data: boolean) {
    if (data) {
      this.menuState = false;
      this.isShadow = false;
      this.isOpen = false;
      this.#cdr.detectChanges();
    }
  }

  onMenuClosedByClick(data: boolean) {
    if (this.menuState) {
      this.menuState = false;
      this.isShadow = false;
      this.isOpen = false;
    }
  }
}
