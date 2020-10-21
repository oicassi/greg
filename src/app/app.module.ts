import { JwtInterceptor } from './core/_helpers/jwt.interceptor';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
// used to create fake backend
import { fakeBackendProvider } from "src/app/core/_helpers";
import { AppComponent } from './app.component';
import { routing } from "./app.routing";
import { ComponentesModule } from './componentes/componentes.module';
import { ComponentsModule } from './components/components.module';
import { ApiService } from './core/_services/api.service';
import { LoaderService } from './core/_services/loader.service';
import { FullpreviewComponent } from './pages/fullpreview/fullpreview.component';
import { PagesModule } from './pages/pages.module';
import { PreviewModule } from './preview/preview.module';
import { DirectivesModule } from './shared/directives/directives.module';
import { SharedModule } from './shared/shared.module';



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
    ButtonModule,
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

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
