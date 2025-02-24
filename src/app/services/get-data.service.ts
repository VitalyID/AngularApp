import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataUserOperation } from '../types/sectionItem';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  readonly #http = inject(HttpClient);

  readonly #url: string =
    'https://gist.githubusercontent.com/VitalyID/a4c1543c09c2962708a55dfec8328cf2/raw/f44d3cc2bb2287965d5114e1c037c2b2c5366e71/gistfile1.txt';
  getDataUserOperationAPI(): Observable<DataUserOperation[]> {
    return this.#http.get<DataUserOperation[]>(this.#url);
  }
}
