import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  // constructor(private http: HttpClient) {}

  // #url: string = 'https://mpac992119fbcdc51286.free.beeceptor.com/tips';
  #url: string =
    'https://gist.githubusercontent.com/VitalyID/a4c1543c09c2962708a55dfec8328cf2/raw/f44d3cc2bb2287965d5114e1c037c2b2c5366e71/gistfile1.txt';
  getDataUserOperationAPI(): Observable<any> {
    const http = inject(HttpClient);
    return http.get(this.#url);
  }
}
