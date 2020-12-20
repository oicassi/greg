import { FactoryService } from '@services/factory.service';
import { AplicativoService } from '@services/aplicativo.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

/**
 * Componente para adicionar novos aplicativos, informando nome do aplicativo e username (se for aplicativo de acesso à API)
 */

@Component({
  selector: 'app-aplicativo-control',
  templateUrl: './aplicativo-control.component.html',
  styleUrls: ['./aplicativo-control.component.scss']
})
export class AplicativoControlComponent implements OnInit {

  @Input() type: string;
  @Input() component_name: string;
  @Input() order: number;

  // Controle de estado
  isExistente = false;
  isSelecionado = false;

  // Formulário;
  form: FormGroup;

  // Visual
  seletorLabel = 'Tipo de componente';
  isTypeInvalid = false;

  constructor(
    private _fb: FormBuilder,
    private _appSrv: AplicativoService,
    private _factorySrv: FactoryService
  ) { }

  ngOnInit() {
    // Seta o estado inicial do aplicativo
    this.setEstadoInicial();
  }

  /**
   * Retorna uma lista com os tipos de aplicativos selecionáveis
   */
  get tiposAplicativos(): Array<{ type: string, label: string }> {
    return this._appSrv.getTiposAplicativos();
  }

  /**
   * Retorna uma lista com todos os tipos de aplicativos existentes
   */
  get todosTiposAplicativos(): Array<{ type: string, label: string }> {
    return this._appSrv.getTodosTiposAplicativos();
  }

  /**
   * Retorna um label do aplicativo
   */
  get tipoAplicativo(): string {
    const aplicativo =  this.todosTiposAplicativos.find((app) => app.type === this.type);
    return aplicativo.label || '';
  }

  /**
   * Seta o estado inicial do aplicativo control
   */
  setEstadoInicial(): void {
    // Verifica se o aplicativo já está adicionado
    if (!this.type && !this.component_name && !this.order) {
      return;
    }
    this.isExistente = true;
    this.isSelecionado = true;

    // Altera o label do botão dropdown
    this.alteraLabelSeletor();
  }

  /**
   * Inicializa o formulário
   */
  initForm(): void {
    this.form = this._fb.group({
      component_name: [(this.component_name || ''), [
        Validators.required,
        this.validarNomeUnicoComponente.bind(this)
      ]]
    })
  }

  /**
   * Callback quando for adicionado
   */
  onClickAdicionar(): void {
    this.isSelecionado = true;
    this.initForm();
  }

  /**
   * Callback quando o tipo for selecionado
   */
  onTypeSelected(type: string): void {
    this.type = type;
    this.isTypeInvalid = false;

    // Altera o label do botão dropdown
    this.alteraLabelSeletor();
  }

  /**
   * Salvar as alterações
   */
  onClickSalvar(): void {
    // Marcar os campos do formulário como dirty
    this.verificarCamposFormularios(this.form);

    // Verifica se foi selecionado um tipo
    if (!this.type) {
      this.isTypeInvalid = true;
      return;
    }

    // Verifica se o campo de component_name é válido
    if (!this.form.get('component_name').valid) {
      return;
    }

    let app;

    // Verificar se adiciona o aplicativo ou substitui
    if (this.order !== null && this.order !== undefined) {
      app = this._appSrv.getAplicativoByOrder(this.order);
      app.isEdit = false;

      // Verificar se houve mudança de tipo
      if (app.type !== this.type) {
        app = this._factorySrv.getModel(this.type);
        app.order = this.order;
        app.isEdit = true;
      }

    } else {
      app = this._factorySrv.getModel(this.type);
      app.isEdit = true;
    }

    // Seta as variáveis
    app.component_name = this.form.get('component_name').value;
    app.type = this.type;

    // Salva um novo ou substitui um existente
    if (this.order !== null && this.order !== undefined) {
      this._appSrv.replaceAplicativo(app);
    } else {
      this._appSrv.addAplicativo(app);
    }
    // Reseta o status do controlador
    this.resetControlador(this.order);

  }

  /**
   * Remove um aplicativo
   * @param app Aplicativo para ser removido
   */
  onClickRemove(): void {
    this._appSrv.removeAplicativo(this.order);
  }

  /**
   * Habilitar edição do componente
   */
  onClickEditar(): void {
    this.isExistente = false;
    this.initForm();
    this.alteraLabelSeletor();
  }

  /**
   * Callback para clique no botão de cancelar
   */
  onClickCancelar(): void {
    this.resetControlador(this.order);
  }

  /**
   * Validação de nome único de componente
   * @param input Input que está sendo validado
   */
  validarNomeUnicoComponente(input: FormControl) {
    let condition = false;
    this._appSrv.getAplicativos().forEach((app) => {
      if ((app.component_name === input.value) && (this.order !== app.order)) {
        condition = true;
      }
    })
    return condition ? { equal: true } : null;
  }

  /**
   * Reseta controlador
   * @param order Order do aplciativo (opcional)
   */
  resetControlador(order = null): void {
    if (this.order !== null && this.order !== undefined) {
      this.setEstadoInicial();
      return;
    }
    this.form.removeControl('component_name');
    this.isSelecionado = false;
    this.isExistente = false;
    this.type = null;
    this.seletorLabel = 'Tipo de componente';

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
   * Altera o label do botão dropdown;
   */
  alteraLabelSeletor(): void {
    this.todosTiposAplicativos.forEach((app) => {
      if (app.type === this.type) {
        this.seletorLabel = app.label;
      }
    })
  }

}