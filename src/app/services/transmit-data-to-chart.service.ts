import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransmitDataToChartService {
  private _dataX = new BehaviorSubject<string[]>([]);
  private _dataY = new BehaviorSubject<number[]>([]);

  public dataX$ : Observable<string[]> = this._dataX.asObservable();
  public dataY$ : Observable<number[]> = this._dataY.asObservable();

  constructor() { }

setData(dataX: string[], dataY: number[])
{
  this._dataX.next(dataX)
  this._dataY.next(dataY)
}
}
