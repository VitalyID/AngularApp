import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataUserOperation } from '../types/interfaces/userOperation';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  readonly #http = inject(HttpClient);

  readonly #url: string =
    'https://gist.githubusercontent.com/VitalyID/a4c1543c09c2962708a55dfec8328cf2/raw/f44d3cc2bb2287965d5114e1c037c2b2c5366e71/gistfile1.txt';
  readonly #url2: string =
    'https://gist.githubusercontent.com/VitalyID/a4c1543c09c2962708a55dfec8328cf2/raw/565b3abfcdfb47639886633d97c97646cbfa5945/gistfile1.txt';
  getDataUserOperationAPI(): Observable<DataUserOperation[]> {
    return this.#http.get<DataUserOperation[]>(this.#url2);
  }
}
