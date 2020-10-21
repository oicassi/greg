import { AlertComponent } from './components/alert/alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [AlertComponent]
})
export class SharedModule { }
