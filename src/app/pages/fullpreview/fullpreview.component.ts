import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';
import { FactoryService } from '@services/factory.service';
import { AplicativoBase } from '@models/aplicativo';
import { UserPageGlobal } from '@models/user';
import { PagesService } from '@services/pages.service';
import {NavbarService} from "@services/navbar.service";

@Component({
  selector: 'app-fullpreview',
  templateUrl: './fullpreview.component.html',
  styleUrls: ['./fullpreview.component.scss']
})
export class FullpreviewComponent implements OnInit {

  isPreview = false;

  constructor(
    private _appSrv: AplicativoService,
    private _pagesSrv: PagesService,
    private _router: Router,
    public factorySrv: FactoryService,
    private nav: NavbarService
  ) {
    this.isPreview = this._pagesSrv.visualizarPreview;
  }

  ngOnInit() {
    this.nav.hide()
  }

  /**
   * Setter do aplicativo
   */
  set aplicativos(aplicativos: AplicativoBase[]) {
    this._appSrv.setAplicativos(aplicativos);
  }

  /**
   * Getter dos aplicativos
   */
  get aplicativos(): AplicativoBase[] {
    let apps = this._appSrv.getAplicativos();
    apps.forEach((app, i) => app.order = i);
    this.setAplicativosNotEditable(apps);
    return apps;
  }

  /**
   * Setter dos dados da página
   */
  set dadosUsuario(dados: UserPageGlobal) {
    this._pagesSrv.setPageGlobalInfo(dados);
  }

  /**
   * Getter dos dados da página
   */
  get dadosUsuario(): UserPageGlobal {
    return this._pagesSrv.getPageGlobalInfo();
  }

  /**
   * Setar que os aplicativos podem ser editados
   */
  setAplicativosNotEditable(apps: AplicativoBase[]): void {
    apps.forEach((app) => app.isEditable = false);
  }

  voltarParaEdicao(): void {
    this._pagesSrv.visualizarPreview = false;
    this._router.navigate(['/editPage']);
    this.nav.show();
  }

  /**
   * Retorna o estilo da cor de fundo
   */
  customPageBgColor(): Object {
    return {'background-color': this.dadosUsuario.pageBgColor}
  }
}
