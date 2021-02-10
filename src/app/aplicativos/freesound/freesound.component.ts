import { AlertService } from './../../shared/components/alert/alert.service';
import { AplicativoService } from '@services/aplicativo.service';
import { Audio } from '@models/aplicativo-item';
import { AplicativoFreesound } from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';
import { AplicativoGenericoApiComponent } from '@aplicativos/aplicativo-generico-api/aplicativo-generico-api.component';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalAplicativoComponent } from '@components/modal-aplicativo/modal-aplicativo.component';

@Component({
  selector: 'app-freesound',
  templateUrl: './freesound.component.html',
  styleUrls: ['./freesound.component.scss']
})
export class FreesoundComponent extends AplicativoGenericoApiComponent implements OnInit {

  @Input() dados: AplicativoFreesound;
  dadosBkp: AplicativoFreesound;

  // Funcionalidades
  audioEmReproducao: Audio = null;
  forcePlay = false;

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
    this._appServ.requestFreesoundData(this.dados).subscribe(
      (novosDados => {
        this.dados = novosDados;
        this.setVariaveisIniciais();
        this.loading = false;
      }),
      ((err) => {
        this.tratarErros(err, 'FreeSound', true);
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
      })
    )
  }

  /**
   * Seta variáveis adicionais
   */
  setVariaveisIniciais(): void {
    this.criaBackupDados();
    this.setEstadoAplicativo();
    this.setAudioInicial();
  }

  /**
   * Inicializar o áudio inicial
   */
  setAudioInicial(): void {
    if (this.dados.audio_array && this.dados.audio_array.length) {
      this.audioEmReproducao = this.dados.audio_array[0];
    }
  }

  /**
   * Troca o o áudio que está sendo reproduzido
   * @param urlAudio URL do áudio
   */
  handleTrocaAudio(audio: Audio): void {
    this.audioEmReproducao = audio;
    this.forcePlay = true;
  }

  /**
   * Handler ao clicar no botão de abrir o modal
   */
  onOpenModal(): void {
    this.dados.audios = [];
    this.openDialog(this._appServ.requestFreesoundData(this.dados));
  }

  /*
    Abre modal passando repositorios
   */
  openDialog(request : Observable<AplicativoFreesound>): void {
    this.loading = true;
    request.subscribe(data => {
      let dialogRef = this.dialog.open(ModalAplicativoComponent, {

        width: '1000px',
        height:'700px',
        data: {content: data.audio_array, metadata: this.dados.audios }
      });

      dialogRef.afterClosed().subscribe((result: {chosen: Audio[], metadataChosen: any[]}) => {
        if (!result || !result.chosen || !result.chosen.length || !result.metadataChosen || !result.metadataChosen.length) {
          this.dados.audio_array = [...this.dadosBkp.audio_array];
          this.dados.audios = [...this.dadosBkp.audios];
          this.loading = false;
        } else {
          this.dados.audio_array = result.chosen;
          this.dados.audios = result.metadataChosen;
          this.setVariaveisIniciais();
          this.loading = false;
        }
      });
    dialogRef = null;
    }, error => {
      this.dados.username = this.dadosBkp.username;
      this.tratarErros(error, 'FreeSound', true);
      this.loading = false;
    })
  }

  onUsernameSubmit(username: string) {
    this.dados.username = username;
    this.dados.audios = [];
    this.onOpenModal();
    // this.loadAll()
  }
}
