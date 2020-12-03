import { AplicativoGenericoComponent } from '@aplicativos/aplicativo-generico/aplicativo-generico.component';
import { Component, Input, OnInit } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';
import { AplicativoApi } from '@models/aplicativo';

@Component({
  selector: 'app-aplicativo-generico-api',
  template: `<ng-template></ng-template>`
})
export class AplicativoGenericoApiComponent extends AplicativoGenericoComponent implements OnInit {

  @Input() dados: AplicativoApi;
  dadosBkp: AplicativoApi;

  // Controle de estado
  hasCheckedApi = false;

  constructor(
    _appServ: AplicativoService,
  ) {
    super(_appServ);
  }

  ngOnInit() {
    this.setEstadoAplicativo();
  }

  /**
   * Verifica o estado inicial do aplicativo
   */
  setEstadoAplicativo(): void {
    if (this.dados.username &&
      this.dados.order !== undefined &&
      this.dados.order !== null
    ) {
      this.hasCheckedApi = true;
    }
  }

  /**
   * Quando submete um novo username para ser feita uma requisição a API
   * @param username Username digitado
   */
  onUsernameSubmit(username:string) {
    console.log('Username submited: ', username);
    if (this.dados['username'] !== undefined && 
    this.dados['username'] !== null &&
    this.dados['username'] !== username) {
      console.log('Fazendo nova requisição a API')
      return
    }
    console.log('Não é tem requisição para API')
  }

}
