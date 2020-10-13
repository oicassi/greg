import { SharedModule } from './../shared/shared.module';
import { CardComponent } from './../core/_components/card/card.component';
import { CustomDirectivesModule } from './../custom-directives/custom-directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms'

import { AlertComponent } from './../core/_components/alert.component';
import { RegisterComponent } from './login-register/register/register.component';
import { LoginComponent } from './login-register/login/login.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserConfigComponent } from './user-config/user-config.component';
import { SearchComponent } from './search/search.component';
import { LandingButtonsComponent } from './search/landing-buttons/landing-buttons.component';
import { InputSearchComponent } from './search/input-search/input-search.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagCloudModule } from 'angular-tag-cloud-module';


@NgModule({
  declarations: 
  [ LoginComponent,
    RegisterComponent,
    LoginRegisterComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    NotFoundComponent,
    UserConfigComponent,
    SearchComponent,
    LandingButtonsComponent,
    InputSearchComponent,
    CardComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    CustomDirectivesModule,
    ProgressSpinnerModule,
    TagCloudModule
  ],
  exports: [LoginRegisterComponent]
})
export class PagesModule { }
