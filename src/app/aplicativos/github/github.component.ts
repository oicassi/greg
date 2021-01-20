import { AplicativoGenericoApiComponent } from '@aplicativos/aplicativo-generico-api/aplicativo-generico-api.component';
import { AplicativoGithub } from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent extends AplicativoGenericoApiComponent implements OnInit {

  @Input() dados: AplicativoGithub;
  dadosBkp: AplicativoGithub;

  constructor(
    _appServ: AplicativoService,
    _apiServ: ApiService
  ) {
    super(_appServ, _apiServ);
  }

  ngOnInit() {
    this.loading = true;
    this.criaBackupDados();
    this.loadAll();
  }

  /**
   * Carrega todos os dados
   */
  loadAll(): void {
    this.loading = true;
    this._appServ.requestGithubData(this.dados).subscribe(
      (novosDados => {
        this.dados = novosDados;
        this.setVariaveisIniciais();
        this.loading = false;
      }),
      ((err) => {
        console.log('%cOcorreu um erro na busca de dados do github', 'color: red');
        console.log(err);
        if (this.dados.username != this.dadosBkp.username) {
          this.dados = this.dadosBkp;
          this.criaBackupDados();
          this.loadAll();
        } else {
          this.setVariaveisIniciais();
          this.loading = false;
        }
      })
    )
  }

  /**
   * Seta variáveis adicionais
   */
  setVariaveisIniciais(): void {
    this.criaBackupDados();
    this.setEstadoAplicativo();
  }

  /**
   * Handler ao clicar no botão de abrir o modal
   */
  onOpenModal(): void {
    console.log(`[${this.dados.component_name}] clicado no botão de abrir modal`);
  }

  /**
   * Handler para submit de nome de usuário do github
   * @param username 
   */
  onUsernameSubmit(username: string) {
    console.log('bagulho dentro do github')
    console.log(username);
    this.dados.username = username;
    this.loadAll()
  }
}
