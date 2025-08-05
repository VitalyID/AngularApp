import { RouterModule, Routes } from '@angular/router';
import { PersonalDataComponent } from './personal-data.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [{ path: '', component: PersonalDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalDataRoutingModule {}
