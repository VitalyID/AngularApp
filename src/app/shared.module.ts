import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { AsideComponent } from './components/layouts/aside/aside.component';
import { SectionComponent } from './components/section/section.component';

@NgModule({
  imports: [BrowserModule],
  exports: [AsideComponent, SectionComponent, ButtonsComponent],
  declarations: [AsideComponent, SectionComponent, ButtonsComponent],
  providers: [],
})
export class SharedModule {}
