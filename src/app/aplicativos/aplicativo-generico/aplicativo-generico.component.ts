import { AplicativoService } from '@services/aplicativo.service';
import { AplicativoBase } from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aplicativo-generico',
  template: `<ng-template></ng-template>`
})
export class AplicativoGenericoComponent implements OnInit {

  @Input() dados: AplicativoBase;
  dadosBkp: AplicativoBase;

  constructor(protected _appServ: AplicativoService) { }

  ngOnInit() {
  }

  /**
   * Cria uma cópia dos dados para ter caso o usuário cancele a edição
   */
  criaBackupDados(): void {
    console.log('Djanho bruto')
    this.dadosBkp = Object.assign({}, this.dados);
  }
  

  /**
   * Colocar o componente em modo de edição
   */
  onClickEditar(): void {
    console.log('Botão editar pressionado');
    this.dados.isEdit = true;
  }

  /**
   * Salvar edições realizadas
   */
  onClickConfirmarEdicao(): void {
    console.log('Botão confirmar edições pressionado');
    this.dados.isEdit = false;
    this.criaBackupDados();
    this._appServ.replaceAplicativo(this.dados);
  }

  /**
   * Sair do modo de edição de componente
   */
  onClickCancelEditar(): void {
    console.log('Botão cancelar edição pressionado');
    this.dados = Object.assign({}, this.dadosBkp);
    this.dados.isEdit = false;
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

  /**
   * Retorna as cores de background e foreground do componente
   */
  customStyle(): any {
    const bgColor = this.dados.bgColor || '#FFFFFF';
    const fgColor = this.dados.fgColor || '#444444';

    return {
      'background-color':bgColor,
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
}