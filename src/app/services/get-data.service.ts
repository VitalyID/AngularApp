import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataUserOperation } from '../types/interfaces/userOperation';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  readonly #http = inject(HttpClient);

  readonly #url2: string =
    'https://gist.githubusercontent.com/VitalyID/a4c1543c09c2962708a55dfec8328cf2/raw/37ca29da0cb11b740c88d865e8bcf3a0de38c92b/gistfile1.txt';
  getDataUserOperationAPI(): Observable<DataUserOperation[]> {
    return this.#http.get<DataUserOperation[]>(this.#url2);
  }
}
