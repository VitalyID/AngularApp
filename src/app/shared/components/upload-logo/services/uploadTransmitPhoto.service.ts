import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadTransmitPhotoService {
  // channelTransmitPhoto$ = new Subject<File>();
  getUserPhotoFromService$ = new Subject<File>();

  getPhotoFromComponent(data: File) {
    this.getUserPhotoFromService$.next(data);
  }
}
