import { AplicativoGenericoComponent } from '@aplicativos/aplicativo-generico/aplicativo-generico.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';
import { AplicativoApi } from '@models/aplicativo';
import { InputGroupComponent } from '@shared-components/input-group/input-group.component';
import { ApiService } from '@services/api.service';
import { AlertService } from '@shared-components/alert/alert.service';

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

  errorState = false;

  constructor(
    _appServ: AplicativoService,
    alertService: AlertService,
    protected _apiServ: ApiService,
  ) {
    super(_appServ, alertService);
  }

  ngOnInit() {
  }

  /**
   * Verifica o estado inicial do aplicativo
   */
  setEstadoAplicativo(): void {
    let checked = false;
    if (this.dados.username &&
      this.dados.order !== undefined &&
      this.dados.order !== null
    ) {
      checked = true;
    }
    this.hasCheckedApi = checked;
  }

  /**
   * Quando submete um novo username para ser feita uma requisição a API
   * @param username Username digitado
   */
  onUsernameSubmit(username: string) {
    if (this.dados['username'] !== undefined &&
      this.dados['username'] !== null &&
      this.dados['username'] !== username) {
      return
    }
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
