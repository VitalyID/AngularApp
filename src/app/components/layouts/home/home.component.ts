import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AsideComponent } from '../aside/aside.component';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, HeaderUserComponent, AsideComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly #route = inject(ActivatedRoute);

  asideID?: number;

  ngOnInit(): void {
    this.asideID = this.#route.snapshot.data['asideID'];
  }
}
