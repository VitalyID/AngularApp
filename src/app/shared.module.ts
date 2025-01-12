import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AsideComponent } from './components/aside/aside.component';
import { SectionComponent } from './components/section/section.component';

@NgModule({
  imports: [BrowserModule],
  exports: [AsideComponent, SectionComponent],
  declarations: [AsideComponent, SectionComponent],
  providers: [],
})
export class SharedModule {}
