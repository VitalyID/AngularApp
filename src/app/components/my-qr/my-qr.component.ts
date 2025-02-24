import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutIDservice } from '../../services/transmitDataRout.service';

@Component({
  selector: 'my-qr',
  imports: [],
  templateUrl: './my-qr.component.html',
  styleUrl: './my-qr.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyQRComponent implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #routService = inject(RoutIDservice);

  asideID: number = 0;

  ngOnInit(): void {
    this.asideID = this.#route.snapshot.data['asideID'];
    this.#routService.getDataRoute(this.asideID);
  }
}
