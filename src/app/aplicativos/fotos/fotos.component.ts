import { FileGregs } from '@models/file-greg';
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

  getImagem(dados: AplicativoFoto) {
    let strImagemPadrao = 'https://www.flaticon.com/svg/vstatic/svg/4305/4305633.svg?token=exp=1615669375~hmac=057f14cb03f0df54ca1e1e4bd9b2aac6';

    return dados.imagem.base64Img ? dados.imagem.base64Img :
                                    dados.imagem.url ? dados.imagem.url: strImagemPadrao;
  }

}
