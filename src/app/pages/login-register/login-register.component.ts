import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  
  
  @ViewChild('login', {static: false}) loginComponent: LoginComponent; 
  
  @ViewChild('register',{static: false}) registerComponent: RegisterComponent;
  
  isLogin = true;

  mudaAbaDireita(event){
    console.log(event);
    this.isLogin = event;
  }

  constructor() { }

  ngOnInit() {
  }

}
