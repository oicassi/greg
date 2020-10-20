import { BtnRoundDirective } from './btn-round.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    BtnRoundDirective],
  imports: [
    CommonModule
  ],
  exports:[
    BtnRoundDirective
  ]
})
export class DirectivesModule { }
