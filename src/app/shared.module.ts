import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AsideComponent } from './components/aside/aside.component';
import { SectionComponent } from './components/section/section.component';
import { ButtonsComponent } from './components/buttons/buttons.component';

@NgModule({
  imports: [BrowserModule],
  exports: [AsideComponent, SectionComponent],
  declarations: [AsideComponent, SectionComponent, ButtonsComponent],
  providers: [],
})
export class SharedModule {}
