import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnRoundDirective } from './btn-round.directive';



@NgModule({
  declarations: [BtnRoundDirective],
  imports: [
    CommonModule,
  ],
  exports: [
    BtnRoundDirective
  ]
})
export class CustomDirectivesModule { }
