import { AplicativoService } from '@services/aplicativo.service';
import { AplicativoBase } from '@models/aplicativo';
import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { AlertService } from '@shared-components/alert/alert.service';

@Component({
  selector: 'app-aplicativo-generico',
  template: `<ng-template></ng-template>`
})
export class AplicativoGenericoComponent implements OnInit, DoCheck {

  @Input() dados: AplicativoBase;
  dadosBkp: AplicativoBase;
  
  // Estado e visual
  isConfigMenuOpen: boolean = false;
  loading = false;

  constructor(
    protected _appServ: AplicativoService,
    protected alertService: AlertService,
  ) { }

  ngOnInit() {
    
  }

  ngDoCheck() {
    this.dadosBkp.order = this.dados.order;
  }

  /**
   * Cria uma cópia dos dados para ter caso o usuário cancele a edição
   */
  criaBackupDados(): void {
    this.antesCriarBackupDados();
    this.dadosBkp = Object.assign({}, this.dados);

    // Faz o deep copy
    for (let key in this.dados) {
      if (Array.isArray(this.dados[key])) {
        this.dadosBkp[key] = Array.from(this.dados[key]);

        // Faz o deep copy dos arrays
        this.deepCopyArray(this.dados[key], this.dadosBkp[key]);

      } else if (typeof this.dados[key] === 'object') {
        this.dadosBkp[key] = Object.assign({}, this.dados[key])
      }
    }

    this.aposCriarBackupDados();
  }

  /**
   * Faz o deep copy dos arrays
   * @param array1 Array origem
   * @param array2 Array destino
   */
  deepCopyArray(array1: Array<any>, array2: Array<any>): void {
    // Checar se o conteúdo do array é do tipo objeto
    if (typeof array1[0] !== 'object') {
      return;
    }

    // Inicia a cópia dos objetos
    for (let i = 0; i < array1.length; i++) {
      array2[i] = Object.assign({}, array1[i]);
    }
  }
  /**
   * Hook par ser executado antes de criar o backup dos dados (para ser reimplementado)
   */
  antesCriarBackupDados(): void { }

  /**
   * Hook para ser executado após criar o backup dos dados (para ser reimplementado)
   */
  aposCriarBackupDados(): void { }


  /**
   * Colocar o componente em modo de edição
   */
  onClickEditar(): void {
    this.dados.isEdit = true;
  }

  /**
   * Salvar edições realizadas
   */
  onClickConfirmarEdicao(): void {
    try {
      this.antesConfirmarEdicao();
      this.dados.isEdit = false;
      this.criaBackupDados();
      this._appServ.replaceAplicativo(this.dados);
      if (this.isConfigMenuOpen) {
        this.isConfigMenuOpen = false;
      }
      this.aposConfirmarEdicao();
    } catch (err) {
      this.tratarErros(err, 'Salvar', false);
    }

  }

  /**
   * Hook para ser executado antes de confirmar a edição (para ser reimplementado)
   */
  antesConfirmarEdicao(): void { }

  /**
   * Hook para ser executado após confirmar a edição (para ser reimplementado)
   */
  aposConfirmarEdicao(): void { }

  /**
   * Sair do modo de edição de componente
   */
  onClickCancelEditar(): void {
    try {
      this.antesCancelarEdicao();
      this.dados = this.dadosBkp;
      this.dados.isEdit = false;
      this.criaBackupDados();
      if (this.isConfigMenuOpen) {
        this.isConfigMenuOpen = false;
      }
      this.aposCancelarEdicao();
    } catch (err) {
      this.tratarErros(err, 'Cancelar edição', false);
    }
  }

  /**
   * Hook para ser executado antes de cancelar a edição (para ser reimplementado)
   */
  antesCancelarEdicao(): void { }

  /**
   * Hook para ser executado após cancelar a edição (para ser reimplementado)
   */
  aposCancelarEdicao(): void { }

  /**
   * Retorna as cores de background e foreground do componente
   */
  customStyle(): any {
    const bgColor = this.dados.bgColor || '#FFFFFF';
    const fgColor = this.dados.fgColor || '#444444';

    return {
      'background-color': bgColor,
      color: fgColor
    }
  }

  /**
   * Callback par quando ocorre uma alteração nos color pickers
   * @param event Evento de mudança no color picker
   */
  onColorChange(event: any): void {
    this.dados[event.name] = event.value;
  }

  /**
   * Toggler para abertura e fechamento do menu de configuração
   */
  toggleConfigMenu() {
    this.isConfigMenuOpen = !this.isConfigMenuOpen;
  }

  /**
   * Marcar os campos de um formulário como dirty e touched
   * @param form Formulário para ser processado
   */
  verificarCamposFormularios(form: FormGroup) {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      control.markAsDirty({ onlySelf: true });
      control.markAsTouched({ onlySelf: true });
    });
  }

  /**
   * Método genérico para tratar erros
   * @param err Objeto de erros
   */
  tratarErros(err: Error, acao: string = null, isRequest: boolean = false) {
    let msg = '%cOcorreu um erro';
    
    if (isRequest) {
      console.log('Erro RAW');
      console.log(err)
      msg = '[Erro ?] ';
      let status = 500;
      if (err['status']) {
        status = err['status']
      }

      switch (status) {
        case 404:
          msg += 'Dados não encontrados. Username pode estar incorreto.';
          break
        case 500:
          msg += 'Ocorreu um erro inesperado ao recuperar os dados. Tente novamente mais tarde.';
          break;
        default:
          msg += 'Ocorreu um erro inesperado ao recuperar os dados. Tente novamente mais tarde.';
      }

      msg = acao ? msg.replace('?', acao) : msg.replace('?', 'Geral');
    } else {
      if (acao) {
        msg += ` na ação ${acao}`;
      }
      msg += ` no componente ${this.dados.component_name}`
      console.log(msg, 'color: tomato');
    }
    this.alertService.danger(msg);
  }
}