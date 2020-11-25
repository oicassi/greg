import { AlertComponent } from './components/alert/alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleButtonComponent } from './components/circle-button/circle-button.component';
import { InputGroupComponent } from './components/input-group/input-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AplicativoHeaderComponent } from './components/aplicativo-header/aplicativo-header.component';
import { PlaylistContainerComponent } from './components/playlist-container/playlist-container.component';
import { PlaylistItemComponent } from './components/playlist-item/playlist-item.component';



@NgModule({
  declarations: [
    AlertComponent,
    CircleButtonComponent,
    InputGroupComponent,
    AplicativoHeaderComponent,
    PlaylistContainerComponent,
    PlaylistItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AlertComponent,
    CircleButtonComponent,
    InputGroupComponent,
    AplicativoHeaderComponent,
    PlaylistContainerComponent,
    PlaylistItemComponent
  ]
})
export class SharedModule { }
