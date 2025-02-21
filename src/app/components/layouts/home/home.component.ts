import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly #route = inject(ActivatedRoute);

  asideID?: number;

  ngOnInit(): void {
    this.asideID = this.#route.snapshot.data['asideID'];
    console.log('asideID ', this.asideID);
  }
}
