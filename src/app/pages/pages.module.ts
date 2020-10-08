import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms'

import { AlertComponent } from './../core/_components/alert.component';
import { RegisterComponent } from './login-register/register/register.component';
import { LoginComponent } from './login-register/login/login.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserConfigComponent } from './user-config/user-config.component';


@NgModule({
  declarations: 
  [ LoginComponent,
    RegisterComponent,
    LoginRegisterComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    NotFoundComponent,
    UserConfigComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [LoginRegisterComponent]
})
export class PagesModule { }
