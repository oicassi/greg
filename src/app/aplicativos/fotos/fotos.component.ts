import { FileGregs } from './../../shared/models/file-greg';
import { AplicativoFoto } from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';
import { AplicativoGenericoComponent } from '@aplicativos/aplicativo-generico/aplicativo-generico.component';
import { AplicativoService } from '@services/aplicativo.service';
import { AlertService } from '@shared-components/alert/alert.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.scss']
})
export class FotosComponent extends AplicativoGenericoComponent implements OnInit {

  @Input() dados: AplicativoFoto;
  dadosBkp: AplicativoFoto;

  constructor(
    _appServ: AplicativoService,
    protected alertService: AlertService,
  ) {
    super(_appServ, alertService);
  }

  ngOnInit() {
    this.criaBackupDados();
  }

  /**
   * Handler ao clicar no botão de abrir o modal
   */
  onOpenModal():void {
  }

  /**
   * Handler ao clicar no botão de input arquivo
   */
  onInputTrocarFoto(event: FileGregs):void {
    this.dados.imagem = event;
    this.dadosBkp.imagem = event;
  }
}
