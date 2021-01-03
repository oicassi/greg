import { AplicativoGenericoApiComponent } from '@aplicativos/aplicativo-generico-api/aplicativo-generico-api.component';
import {AplicativoFlickr, AplicativoGithub} from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';
import { ApiService } from '@services/api.service';
import {ModalAplicativoComponent} from "@components/modal-aplicativo/modal-aplicativo.component";
import {MatDialog} from "@angular/material/dialog";
import {Foto, Repo} from "@models/aplicativo-item";
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
    public dialog: MatDialog
  ) {
    super(_appServ, _apiServ);
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
    this.openDialog(this._appServ.requestGithubData(this.dados));
  }

  /*
    Abre modal passando repositorios
   */
  openDialog(request : Observable<AplicativoGithub>): void {
    request.subscribe(repos => {
      let dialogRef = this.dialog.open(ModalAplicativoComponent, {

        width: '1000px',
        height:'700px',
        data: repos.repo_array
      });

      dialogRef.afterClosed().subscribe((result: Repo[]) => {
        if (!result) {
          this.dados.repo_array = [...this.dadosBkp.repo_array];
        } else {
          this.dados.repo_array = result;
          this.setVariaveisIniciais();
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
    this.onOpenModal();
  }
}
