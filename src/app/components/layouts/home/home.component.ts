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

  parent: string = 'home';

  ngOnInit(): void {
    this.asideID = this.#route.snapshot.data['asideID'];

    this.#menuService.stateMenuService
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        // this.menuState = data;
        this.isShadow = data;
        // console.log(this.menuState, '4444444444');
        this.#cdr.detectChanges();
      });
  }
}
