import { AplicativoGenericoApiComponent } from '@aplicativos/aplicativo-generico-api/aplicativo-generico-api.component';
import { AplicativoGithub } from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';

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
  ) {
    super(_appServ);
  }

  ngOnInit() {
    this.setEstadoAplicativo();
    this.printBagulhets();
    this.criaBackupDados();
    console.log(this.dados);
  }

  /**
   * Handler ao clicar no botão de abrir o modal
   */
  onOpenModal():void {
    console.log(`[${this.dados.component_name}] clicado no botão de abrir modal`);
  }
}
