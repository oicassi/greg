import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms'

import { AlertComponent } from './../core/_components/alert.component';
import { RegisterComponent } from './login-register/register/register.component';
import { LoginComponent } from './login-register/login/login.component';
import { LoginRegisterComponent } from './login-register/login-register.component';


@NgModule({
  declarations: 
  [ LoginComponent,
    RegisterComponent,
    LoginRegisterComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [LoginRegisterComponent]
})
export class PagesModule { }
