import {AplicativosModule} from '@aplicativos/aplicativos.module';
import {JwtInterceptor} from './core/_helpers';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// used to create fake backend
import {fakeBackendProvider} from "src/app/core/_helpers";
import {routing} from "./app.routing";
import {ComponentsModule} from '@components/components.module';
import {ApiService} from '@services/api.service';
import {LoaderService} from '@services/loader.service';
import {FullpreviewComponent} from '@pages/fullpreview/fullpreview.component';
import {PagesModule} from '@pages/pages.module';
import {DirectivesModule} from '@shared/directives/directives.module';
import {SharedModule} from '@shared/shared.module';
import {BnNgIdleService} from 'bn-ng-idle';
import {AppComponent} from "./app.component";
import {MatDialogModule} from "@angular/material/dialog";
import {DragDropModule} from "@angular/cdk/drag-drop";


@NgModule({
  declarations: [
    AppComponent,
    FullpreviewComponent,
  ],
  imports: [
    ComponentsModule,
    PagesModule,
    SharedModule,
    MatDialogModule,
    DragDropModule,
    BrowserModule,
    HttpClientModule,
    DirectivesModule,
    BrowserAnimationsModule,
    PagesModule,
    AplicativosModule,
    routing,
  ],
  providers: [
    ApiService,
    LoaderService,
    BnNgIdleService,

    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true,},
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
