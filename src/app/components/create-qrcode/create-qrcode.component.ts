import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { RoutIDservice } from '../../services/transmitDataRout.service';

@Component({
  selector: 'create-qrcode',
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './create-qrcode.component.html',
  styleUrl: './create-qrcode.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNgxMask()],
})
export class CreateQRcodeComponent implements OnInit {
  readonly #routeService = inject(RoutIDservice);
  readonly #route = inject(ActivatedRoute);

  asideID: number = 0;

  myForm = new FormGroup({
    tips1: new FormControl('150', Validators.pattern(/^[0-9]*$/)),
    tips2: new FormControl('200', Validators.pattern(/^[0-9]*$/)),
    tips3: new FormControl('250', Validators.pattern(/^[0-9]*$/)),
  });

  ngOnInit(): void {
    // here is control to active menu on aside-bar
    this.asideID = this.#route.snapshot.data['asideID'];
    this.#routeService.getDataRoute(this.asideID);
  }
}
