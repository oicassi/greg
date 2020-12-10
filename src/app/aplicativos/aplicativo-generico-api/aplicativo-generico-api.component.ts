import { AplicativoGenericoComponent } from '@aplicativos/aplicativo-generico/aplicativo-generico.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';
import { AplicativoApi } from '@models/aplicativo';
import { InputGroupComponent } from '@shared-components/input-group/input-group.component';

@Component({
  selector: 'app-aplicativo-generico-api',
  template: `<ng-template></ng-template>`
})
export class AplicativoGenericoApiComponent extends AplicativoGenericoComponent implements OnInit {

  @Input() dados: AplicativoApi;
  dadosBkp: AplicativoApi;

  protected inputGroup

  @ViewChild(InputGroupComponent, { static: false }) set content(content: InputGroupComponent) {
    if (content) { // initially setter gets called with undefined
      this.inputGroup = content;
    }
  }

  // Controle de estado
  hasCheckedApi = false;

  constructor(
    _appServ: AplicativoService,
  ) {
    super(_appServ);
  }

  ngOnInit() {
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
  onUsernameSubmit(username: string) {
    console.log('Username submited: ', username);
    if (this.dados['username'] !== undefined &&
      this.dados['username'] !== null &&
      this.dados['username'] !== username) {
      console.log('Fazendo nova requisição a API')
      return
    }
    console.log('Não é tem requisição para API')
  }



  antesConfirmarEdicao() {
    // Verifica se o input para inserir o username para buscar na API foi preenchido
    if (!this.inputGroup) {
      return;
    }
    this.inputGroup.verificarCamposFormularios();
    if (!this.inputGroup.verificarValidadeForm()) {
      throw new Error('Input de username não preenchido');
    }
  }
}
