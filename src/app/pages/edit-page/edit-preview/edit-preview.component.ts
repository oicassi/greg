import { FactoryService } from '@services/factory.service';
import { AplicativoService } from '@services/aplicativo.service';
import { Component, OnInit } from '@angular/core';
import { AplicativoBase } from '@models/aplicativo';
import { PagesService } from '@services/pages.service';
import { UserPageGlobal } from '@models/user';

@Component({
  selector: 'app-edit-preview',
  templateUrl: './edit-preview.component.html',
  styleUrls: ['./edit-preview.component.scss']
})
export class EditPreviewComponent implements OnInit {

  constructor(
    private _appSrv: AplicativoService,
    private _pagesSrv: PagesService,
    public factorySrv: FactoryService
  ) { }

  ngOnInit() {
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
    this.setAplicativosEditable(apps);
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
  * Retorna o estilo da cor de fundo
  */
  customPageBgColor(): Object {
    return { 'background-color': this.dadosUsuario.pageBgColor }
  }

  /**
   * Setar que os aplicativos podem ser editados
   */
  setAplicativosEditable(apps: AplicativoBase[]): void {
    apps.forEach((app) => app.isEditable = true);
  }

}
