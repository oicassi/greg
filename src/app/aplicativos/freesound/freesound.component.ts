import { AplicativoService } from '@services/aplicativo.service';
import { Audio } from '@models/aplicativo-item';
import { AplicativoFreesound } from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';
import { AplicativoGenericoApiComponent } from '@aplicativos/aplicativo-generico-api/aplicativo-generico-api.component';

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
  ) {
    super(_appServ);
  }

  ngOnInit() {
    this.setEstadoAplicativo();
    this.setAudioInicial();
    this.printBagulhets();
    this.criaBackupDados();
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
    console.log(this.audioEmReproducao);
  }

  /**
   * Handler ao clicar no botão de abrir o modal
   */
  onOpenModal():void {
    console.log(`[${this.dados.component_name}] clicado no botão de abrir modal`);
  }
}