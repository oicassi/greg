import {AplicativosModule} from '@aplicativos/aplicativos.module';
import {CardComponent} from '@components/card/card.component';
import {HomeAdminComponent} from './home-admin/home-admin.component';
import {DirectivesModule} from '@shared/directives/directives.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@shared/shared.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms'
import {RegisterComponent} from '@pages/login-register/register';
import {LoginComponent} from '@pages/login-register/login';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {UserConfigComponent} from './user-config/user-config.component';
import {SearchComponent} from './search/search.component';
import {LandingButtonsComponent} from './search/landing-buttons/landing-buttons.component';
import {InputSearchComponent} from './search/input-search/input-search.component';
import {TagCloudModule} from 'angular-tag-cloud-module';
import {EditPageComponent} from './edit-page/edit-page.component';
import {EditControlComponent} from './edit-page/edit-control/edit-control.component';
import {EditPreviewComponent} from './edit-page/edit-preview/edit-preview.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { VisualizacaoComponent } from './visualizacao/visualizacao.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeAdminComponent,
    LoginRegisterComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    UserConfigComponent,
    LandingButtonsComponent,
    SearchComponent,
    LandingButtonsComponent,
    CardComponent,
    InputSearchComponent,
    EditPageComponent,
    EditControlComponent,
    EditPreviewComponent,
    VisualizacaoComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    DirectivesModule,
    RouterModule,
    TagCloudModule,
    AplicativosModule,
    DragDropModule
  ],
  exports: [LoginRegisterComponent, DragDropModule,]
})
export class PagesModule {
}
