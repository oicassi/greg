import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AplicativoBase } from '@models/aplicativo';
import { UserPageGlobal } from '@models/user';
import { AplicativoService } from '@services/aplicativo.service';
import { FactoryService } from '@services/factory.service';
import { PagesService } from '@services/pages.service';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.scss']
})
export class VisualizacaoComponent implements OnInit {

  urlUser: string = null;

  constructor(
    private _appSrv: AplicativoService,
    private _pagesSrv: PagesService,
    private route: ActivatedRoute,
    public factorySrv: FactoryService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['user']) {
        this.urlUser = params['user'];
      }
    });
    this.carregarComponentes(this.urlUser);
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
   * Carrega os componentes salvos do banco de dados
   */
  carregarComponentes(url: string) {
    this._appSrv.carregarAplicativos(url).subscribe(resposta => {
      console.log('Olha so que coisa');
      console.log(resposta);
      this.aplicativos = resposta as AplicativoBase[]
    }, (err => {
      console.log('Mas ocorreu um erro bem chato');
      console.log(err)
    }))
  }

  /**
   * Setar que os aplicativos podem ser editados
   */
  setAplicativosNotEditable(apps: AplicativoBase[]): void {
    apps.forEach((app) => {
      app.isEditable = false;
      app.isEdit = false;
    });
  }

  /**
   * Retorna o estilo da cor de fundo
   */
  customPageBgColor(): Object {
    let color = '#DADADA';
    if (this.dadosUsuario.pageBgColor) {
      color = this.dadosUsuario.pageBgColor;
    }
    return { 'background-color': color }
  }

}
