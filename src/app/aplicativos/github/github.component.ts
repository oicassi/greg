import { AlertService } from './../../shared/components/alert/alert.service';
import { AplicativoGenericoApiComponent } from '@aplicativos/aplicativo-generico-api/aplicativo-generico-api.component';
import {AplicativoFlickr, AplicativoGithub} from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';
import { ApiService } from '@services/api.service';
import {ModalAplicativoComponent} from "@components/modal-aplicativo/modal-aplicativo.component";
import {MatDialog} from "@angular/material/dialog";
import {Repo} from "@models/aplicativo-item";
import {Observable} from "rxjs";

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
    _apiServ: ApiService,
    public dialog: MatDialog,
    alertService: AlertService
  ) {
    super(_appServ, alertService, _apiServ,);
  }

  ngOnInit() {
    console.log(this.dados)
      this.criaBackupDados();
      this.loadAll();
  }

  /**
   * Carrega todos os dados
   */
  loadAll(): void {
    this.loading = true;
    if(this.dados.username != ""){
    this._appServ.requestGithubData(this.dados).subscribe(
      (novosDados => {
        this.dados = novosDados;
        this.setVariaveisIniciais();
        this.loading = false;
      }),
      ((err) => {
        this.tratarErros(err, 'GitHub', true);
        if (this.dados.username != this.dadosBkp.username) {
          this.dados = this.dadosBkp;
          this._appServ.replaceAplicativo(this.dados);
          this.criaBackupDados();
          this.loadAll();
        } else {
            this.setVariaveisIniciais();
            this.loading = false;
          }
        })
      )
    } else {
      this.loading = false;
    }

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
    this.dados.repos = [];
    this.openDialog(this._appServ.requestGithubData(this.dados));
  }

  /*
    Abre modal passando repositorios
   */
  openDialog(request : Observable<AplicativoGithub>): void {
    this.loading = true;
    request.subscribe(repos => {
      let dialogRef = this.dialog.open(ModalAplicativoComponent, {

        width: '1000px',
        height:'700px',
        data: {content: repos.repo_array, metadata: this.dados.repos }
      });

      dialogRef.afterClosed().subscribe((result: {chosen: Repo[], metadataChosen: any[]}) => {
        if (!result || !result.chosen || !result.chosen.length || !result.metadataChosen || !result.metadataChosen.length) {
          this.dados.repo_array = [...this.dadosBkp.repo_array];
          this.dados.repos = [...this.dadosBkp.repos];
          this.loading = false;
        } else {
          this.dados.repo_array = result.chosen;
          this.dados.repos = result.metadataChosen;
          this.setVariaveisIniciais();
          this.loading = false;
        }
      });
    dialogRef = null;
    }, error => {
      console.log('%cOcorreu um erro na busca de dados do github', 'color: red');
      console.log(error);
    })

  }
  /**
   * Handler para submit de nome de usuário do github
   * @param username
   */
  onUsernameSubmit(username: string) {
    this.dados.username = username;
    this.dados.repos = [];
    this.onOpenModal();
    // this.loadAll()
  }
}
