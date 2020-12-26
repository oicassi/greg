import { Usuario } from 'src/app/shared/models';
import { AuthenticationService } from 'src/app/core/_services';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NavbarService} from "@services/navbar.service";

@Component({
  selector: 'app-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss']
})
export class FloatingMenuComponent implements OnInit {

  @Input() currentUser: Usuario;

  constructor(private nav:NavbarService,
              private authenticationService: AuthenticationService, private router:Router) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["login"]);
    this.nav.hide();
  }

  configuracoes(){
    this.router.navigate(['config']);
  }

  editarPagina(){
    this.router.navigate(['editPage']);
  }

  get imagemUsuario(){
    let strImagemPadrao = 'https://www.w3schools.com/howto/img_avatar.png';
    let strImagem = 'data:image/jpeg;base64,'
    let user = this.authenticationService.currentUserValue;


    return user.imagemUsuario.base64Img ? (strImagem + user.imagemUsuario.base64Img) : strImagemPadrao;
  }

}
