import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/_services';

@Component({
  selector: 'app-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss']
})
export class FloatingMenuComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router:Router) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["login"]);
  }

  configuracoes(){
    this.router.navigate(['config']);
  }

  editarPagina(){
    this.router.navigate(['home']);
  }

}
