import { AlertService } from './../../shared/components/alert/alert.service';
import { AplicativoGenericoApiComponent } from '@aplicativos/aplicativo-generico-api/aplicativo-generico-api.component';
import {AplicativoFlickr, AplicativoGithub} from '@models/aplicativo';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';
import { ApiService } from '@services/api.service';
import {MatDialog} from "@angular/material/dialog";
import {ModalAplicativoComponent} from "@components/modal-aplicativo/modal-aplicativo.component";
import {Observable} from "rxjs";
import {Foto, Repo} from "@models/aplicativo-item";

@Component({
  selector: 'app-flickr',
  templateUrl: './flickr.component.html',
  styleUrls: ['./flickr.component.scss']
})
export class FlickrComponent extends AplicativoGenericoApiComponent implements OnInit {

  @Input() dados: AplicativoFlickr;
  dadosBkp: AplicativoFlickr;

  constructor(
    _appServ: AplicativoService,
    _apiServ: ApiService,
    public dialog: MatDialog,
    alertService: AlertService
  ) {
    super(_appServ, alertService, _apiServ);
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

    this._appServ.requestFlickrData(this.dados).subscribe((novosDados) => {
      console.log(novosDados)
      this.dados = novosDados;
      this.setVariaveisIniciais();
      this.loading = false;
    },
      err => {
        this.tratarErros(err, 'Flickr', true);
        if (this.dados.username != this.dadosBkp.username) {
          this.dados = this.dadosBkp;
          this._appServ.replaceAplicativo(this.dados);
          this.criaBackupDados();
          this.loadAll();
        } else {
          this.setVariaveisIniciais();
          this._appServ.replaceAplicativo(this.dados);
          this.loading = false;
        }
      }
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
    this.dados.imagensFlickr = [];
    this.openDialog(this._appServ.requestFlickrData(this.dados));
  }

  /*
    Abre modal passando repositorios
   */
  openDialog(request : Observable<AplicativoFlickr>): void {
    request.subscribe(repos => {
      let dialogRef = this.dialog.open(ModalAplicativoComponent, {

        width: '1000px',
        height:'700px',
        data: {content: repos.photo_array, metadata: this.dados.imagensFlickr }
      });

      dialogRef.afterClosed().subscribe((result: {chosen: Foto[], metadataChosen: any[]}) => {
        console.log(result);
        if (!result || !result.chosen || !result.chosen.length || !result.metadataChosen || !result.metadataChosen.length) {
          this.dados.photo_array = [...this.dadosBkp.photo_array];
          this.dados.imagensFlickr = [...this.dadosBkp.imagensFlickr];
        } else {
          console.log('dados');
          console.log(result);
          this.dados.photo_array = result.chosen;
          this.dados.imagensFlickr = result.metadataChosen;
          console.log('Olha como ficou');
          console.log(this.dados.photo_array);
          console.log(this.dados.imagensFlickr);
          this.setVariaveisIniciais();
        }
      });
      dialogRef = null;
    }, error => {
      console.log('%cOcorreu um erro na busca de dados do github', 'color: red');
      console.log(error);
    })
  }

  onUsernameSubmit(username: string) {
    this.dados.username = username;
    this.dados.imagensFlickr = [];
    this.onOpenModal();

  }
}
