import { Router, RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './navbar/navbar.component';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material';
import { ModalAplicativoComponent } from './modal-aplicativo/modal-aplicativo.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {SharedModule} from "@shared/shared.module";
import { TagInputComponent } from './tag-input/tag-input.component';
import {MatChipsModule} from "@angular/material/chips";



@NgModule({
  declarations: [
    FloatingMenuComponent,
    NavbarComponent,
    ModalAplicativoComponent,
    TagInputComponent,
  ],
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule,
        MatMenuModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        DragDropModule,
        SharedModule,
        MatChipsModule,
    ],
  exports: [
    ModalAplicativoComponent,
    NavbarComponent,
    TagInputComponent
  ],
  entryComponents: [ModalAplicativoComponent],
})
export class ComponentsModule { }
