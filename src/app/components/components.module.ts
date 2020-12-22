import { Router, RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './navbar/navbar.component';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [
    FloatingMenuComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
  ],
  exports:[
    NavbarComponent
  ]
})
export class ComponentsModule { }
