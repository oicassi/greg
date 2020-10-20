import { PreviewModule } from './preview/preview.module';
import { ComponentesModule } from './componentes/componentes.module';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './shared/directives/directives.module';
import { FullpreviewComponent } from './pages/fullpreview/fullpreview.component';
import { PagesModule } from './pages/pages.module';
import { LoaderService } from './core/_services/loader.service';
import { HttpClientModule, HttpParams, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiService } from './core/_services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PreviewComponent } from './preview/preview.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { GithubComponent } from './preview/github/github.component';
import { TabViewModule } from 'primeng/tabview';
import { ResumoComponent } from './preview/resumo/resumo.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { FlickrComponent } from './preview/flickr/flickr.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FreesoundComponent } from './preview/freesound/freesound.component';
import { ReactiveFormsModule } from "@angular/forms";

// used to create fake backend
import { fakeBackendProvider } from "src/app/core/_helpers";

import { routing } from "./app.routing";



@NgModule({
  declarations: [
    AppComponent,
    FullpreviewComponent,
  ],
  imports: [
    ComponentsModule,
    ComponentesModule,
    PagesModule,
    PreviewModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    DirectivesModule,
    BrowserAnimationsModule,
    MessageModule,
    MessagesModule,
    PagesModule,
    routing,
  ],
  providers: [
    MessageService,
    ApiService,
    LoaderService,

    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
