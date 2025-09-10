import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class QRcodeService {
  readonly #httpServer = inject(HttpClient);

  QRcodeText: string = '';

  SendTextToCode(data: string) {
    this.QRcodeText = data;
    this.getRequestQRapi$();
  }

  getRequestQRapi$(): Observable<string> {
    const baseUrl = 'http://api.qrserver.com/v1/create-qr-code/?data=';
    const size = '&size=150x150';
    const url = `${baseUrl}${this.QRcodeText}${size}`;

    return this.#httpServer.get<string>(url);
  }

}
