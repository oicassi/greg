import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AplicativoBase } from '@models/aplicativo';
import { UserPageGlobal } from '@models/user';
import { AplicativoService } from '@services/aplicativo.service';
import { FactoryService } from '@services/factory.service';
import { PagesService } from '@services/pages.service';
import { AlertService } from '@shared-components/alert/alert.service';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.scss']
})
export class VisualizacaoComponent implements OnInit {

  urlUser: string = null;
  loadingState = false;

  constructor(
    private _appSrv: AplicativoService,
    private _pagesSrv: PagesService,
    private route: ActivatedRoute,
    private _router: Router,
    private alertService: AlertService,
    public factorySrv: FactoryService
  ) { }

  ngOnInit() {
    this.loadingState = true;
    this.urlUser = this.route.snapshot.paramMap.get("user")
    // this.route.queryParams.subscribe(params => {
    //   if (params && params['user']) {
    //     this.urlUser = params['user'];
    //   }
    // });
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
   * Getter do loading
   */
  get loading(): boolean {
    return this.loadingState;
  }

  /**
   * Carrega os componentes salvos do banco de dados
   */
  carregarComponentes(url: string) {
    this._appSrv.carregarAplicativos(url).subscribe(resposta => {
      console.log('Olha so que coisa');
      console.log(resposta);
      this.aplicativos = resposta as AplicativoBase[]
      this.loadingState = false;
    }, (err => {
      this.alertService.danger('Página não foi encontrada');
      this._router.navigate(['**'])
      console.log('Mas ocorreu um erro bem chato');
      console.log(err)
      this.loadingState = false;
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
