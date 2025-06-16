import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { ButtonService } from '../../buttons/service/buttons.component.service'

@Injectable({ providedIn: 'root' })
export class QRcodeService {
  // readonly #buttonService = inject (ButtonService);
  readonly #httpServer = inject(HttpClient);
  // getQRcode = new Subject<string>();

  QRcodeText: string = '';

  SendTextToCode(data: string) {
    this.QRcodeText = data;
    this.getRequestQRapi$();
  }

  getRequestQRapi$(): Observable<string> {
    const baseUrl = 'http://api.qrserver.com/v1/create-qr-code/?data=';
    const size = '&size=150x150';
    const url = `${baseUrl}${this.QRcodeText}${size}`;
    console.log(url);

    return this.#httpServer.get<string>(url);
  }
  constructor() {}
}
