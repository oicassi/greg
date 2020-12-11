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
    this.setEstadoAplicativo();
    this.criaBackupDados();
  }

  /**
   * Handler ao clicar no botão de abrir o modal
   */
  onOpenModal():void {
    console.log(`[${this.dados.component_name}] clicado no botão de abrir modal`);
  }
}
