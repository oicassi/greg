import { AlertComponent } from './components/alert/alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleButtonComponent } from './components/circle-button/circle-button.component';
import { InputGroupComponent } from './components/input-group/input-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AplicativoHeaderComponent } from './components/aplicativo-header/aplicativo-header.component';
import { PlaylistContainerComponent } from './components/playlist-container/playlist-container.component';
import { PlaylistItemComponent } from './components/playlist-item/playlist-item.component';
import { RepoContainerComponent } from './components/repo-container/repo-container.component';
import { RepoItemComponent } from './components/repo-item/repo-item.component';
import { PhotoContainerComponent } from './components/photo-container/photo-container.component';
import { PhotoItemComponent } from './components/photo-item/photo-item.component';
import { ConfigMenuCompComponent } from './components/config-menu-comp/config-menu-comp.component';



@NgModule({
  declarations: [
    AlertComponent,
    CircleButtonComponent,
    InputGroupComponent,
    AplicativoHeaderComponent,
    PlaylistContainerComponent,
    PlaylistItemComponent,
    RepoContainerComponent,
    RepoItemComponent,
    PhotoContainerComponent,
    PhotoItemComponent,
    ConfigMenuCompComponent
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
    PlaylistItemComponent,
    RepoContainerComponent,
    RepoItemComponent,
    PhotoContainerComponent,
    PhotoItemComponent,
    ConfigMenuCompComponent
  ]
})
export class SharedModule { }
