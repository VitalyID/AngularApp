// import { DestroyRef, inject, OnInit } from '@angular/core'
// import { State } from '@ngxs/store';
// import { UploadTransmitPhotoService } from '../../../shared/components/upload-logo/services/uploadTransmitPhoto.service'
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

// Where are from we get data for our store?
//
// the source data uploadLogo user - the service shared/upload-logo/service/uploadTransmitPhoto.service.ts ;

// export interface ProfileLogo {
//   logo: File
// }

// logoDefaults:File;

// @State<uploadLogoModel>({
// photo: 'profileLogo',
// defaults: {
//   null
// }
// })

// export class QrCodeCreatorStates implements OnInit {

// readonly #uploadLogoService = inject (UploadTransmitPhotoService);
// readonly #DestroyRef = inject (DestroyRef);

// ngOnInit(): void {
//     this.#uploadLogoService.getUserPhotoFromService$.pipe(takeUntilDestroyed(this.#DestroyRef)).subscribe (data => {
//       logo
//     })
// }

// }
