import { LoaderService } from './services/loader.service';
import { HttpClientModule, HttpParams } from "@angular/common/http";
import { ApiService } from './services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ComponentesComponent } from './componentes/componentes.component';
import { PreviewComponent } from './preview/preview.component';
import { FormsModule } from '@angular/forms';
import { GithubliteComponent } from './componentes/githublite/githublite.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ResumoliteComponent } from './componentes/resumolite/resumolite.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { GithubComponent } from './preview/github/github.component';
import { CardModule } from 'primeng/card';
import {GalleriaModule} from 'primeng/galleria';
import { TabViewModule } from 'primeng/tabview';
import { ResumoComponent } from './preview/resumo/resumo.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { FlickrliteComponent } from './componentes/flickrlite/flickrlite.component';
import { FlickrComponent } from './preview/flickr/flickr.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FreesoundliteComponent } from './componentes/freesoundlite/freesoundlite.component';
import { FreesoundComponent } from './preview/freesound/freesound.component';
import  {OrderListModule } from 'primeng/orderlist';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComponentesComponent,
    PreviewComponent,
    GithubliteComponent,
    ResumoliteComponent,
    GithubComponent,
    ResumoComponent,
    FlickrliteComponent,
    FlickrComponent,
    FreesoundliteComponent,
    FreesoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    HttpClientModule,
    CardModule,
    TabViewModule,
    InputTextareaModule,
    TooltipModule,
    ProgressSpinnerModule,
    GalleriaModule,
    DragDropModule,
    OrderListModule
  ],
  providers: [
    MessageService,
    ApiService,
    LoaderService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
