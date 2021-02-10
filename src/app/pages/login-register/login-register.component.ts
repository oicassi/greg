import { environment } from 'src/environments/environment';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {


  @ViewChild('login', { static: false }) loginComponent: LoginComponent;

  @ViewChild('register', { static: false }) registerComponent: RegisterComponent;

  isLogin = true;

  titulo = environment.titulo;
  slogan = environment.slogan;
  
  mudaAbaDireita(event) {
    this.isLogin = event;
  }

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params['action'] && params['action'] === 'register') {
        this.isLogin = false;
      }
    })
  }

  ngOnInit() {
  }

}
