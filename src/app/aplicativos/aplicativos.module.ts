import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AplicativoBaseComponent } from './aplicativo-base/aplicativo-base.component';
import { GithubComponent } from './github/github.component';
import { FlickrComponent } from './flickr/flickr.component';
import { FreesoundComponent } from './freesound/freesound.component';
import { TextoComponent } from './texto/texto.component';
import { FotosComponent } from './fotos/fotos.component';
import { TagsComponent } from './tags/tags.component';
import { AplicativoControlComponent } from './aplicativo-control/aplicativo-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AplicativoGenericoComponent } from './aplicativo-generico/aplicativo-generico.component';
import { AplicativoGenericoApiComponent } from './aplicativo-generico-api/aplicativo-generico-api.component';

@NgModule({
  declarations: [
    AplicativoBaseComponent, 
    GithubComponent, 
    FlickrComponent, 
    FreesoundComponent, 
    TextoComponent, 
    FotosComponent, 
    TagsComponent,
    AplicativoControlComponent,
    AplicativoGenericoComponent,
    AplicativoGenericoApiComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    AplicativoBaseComponent, 
    GithubComponent, 
    FlickrComponent, 
    FreesoundComponent, 
    TextoComponent, 
    FotosComponent, 
    TagsComponent,
    AplicativoControlComponent,
  ],
  entryComponents: [
    GithubComponent, 
    FlickrComponent, 
    FreesoundComponent, 
    TextoComponent, 
    FotosComponent, 
    TagsComponent
  ]
})
export class AplicativosModule { }
