import { FactoryService } from '@services/factory.service';
import { AplicativoService } from '@services/aplicativo.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AplicativosModels } from '@shared/constants/aplicativos';
import { AplicativoBase } from '@models/aplicativo';

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
  @Input() username: string;
  @Input() order: number;

  // Controle de estado
  isExistente = false;
  isApi = false;
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
   * Retorna uma lista com os tipos de aplicativos possíveis
   */
  get tiposAplicativos(): Array<{type: string, label: string}> {
    return this._appSrv.getTiposAplicativos();
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
    this.initForm();

    // Verifica se é aplicativo que acessa API
    if (this.username) {
      this.isApi = true;
      this.addControleUsername();
    }

    // Altera o label do botão dropdown
    this.alteraLabelSeletor();
    this._appSrv.getTiposAplicativos().forEach((app) => {
      if (app.type === this.type) {
        this.seletorLabel = app.label;
      }
    })
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

    if (this.isExistente) {
      this.form.controls.component_name.disable();
    }
  }

  /**
   * Adiciona o controle de username para o formulário
   */
  addControleUsername(): void {
    this.form.addControl('username', new FormControl((this.username || ''), [Validators.required]));
    if (this.isExistente) {
      this.form.controls.username.disable();
    }
  }

  /**
   * Remove o controle de username para o formulário
   */
  removeControleUsername(): void {
    this.form.removeControl('username');
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

    // Verifica se o tipo selecionado é do tipo API para adicionar o form de usuário
    this.isApi = AplicativosModels.TIPOS_API.includes(this.type);
    if (this.isApi) {
      this.addControleUsername();
    } else {
      this.removeControleUsername();
    }

    // Altera o label do botão dropdown
    this.alteraLabelSeletor();
  }

  /**
   * Salvar as alterações
   */
  onClickSalvar(): void {
    // Marcar os campos do formulário como dirty
    this.verificarCamposFormularios(this.form);
    
    // Verificar se campos são válidos
    if (!this.type) {
      this.isTypeInvalid = true;
      return;
    }

    if (!this.form.get('component_name').valid) {
      console.log('Falta preencher o nome do componente');
      return;
    }
    
    if (this.isApi && !this.form.get('username').valid) {
      console.log('Falta preencher o username');
      return;
    }
    let app;

    // Verificar se adiciona o aplicativo ou substitui
    if (this.order) {
      app = this._appSrv.getAplicativoByOrder(this.order);
      console.log('ahhh');
      console.log(app);
    } else {
      app = this._factorySrv.getModel(this.type);
    }

    // Seta as variáveis
    app.component_name = this.form.get('component_name').value;
    app.type = this.type;
    if (this.isApi) {
      app['username'] = this.form.get('username').value;
    }

    // Salva um novo ou substitui um existente
    if (this.order) {
      this._appSrv.replaceAplicativo(app);

      // Reseta o controlador
      this.resetControlador(this.order);
    } else {
      this._appSrv.addAplicativo(app);
      
      // Reseta o status do controlador
      this.resetControlador();
    }

    console.log(this._appSrv.getAplicativos());
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
    this.form.controls.component_name.enable();
    if (this.isApi) {
      this.form.controls.username.enable();
    }
  }

  /**
   * Callback para clique no botão de cancelar
   */
  onClickCancelar(): void {
    this.resetControlador();
  }

  /**
   * Validação de nome único de componente
   * @param input Input que está sendo validado
   */
  validarNomeUnicoComponente(input: FormControl) {
    let condition = false;
    this._appSrv.getAplicativos().forEach((app) => {
      if (app.component_name === input.value && !this.order) {
        condition = true;
      }
    })
    return condition ? { equal: true } : null;
  }

  /**
   * Reseta controlador
   * @param order Order do aplciativo (opcional)
   */
  resetControlador(order = null):void {
    if (!order) {
      this.form.removeControl('component_name');
      this.form.removeControl('username');
      this.isSelecionado = false;
      this.isApi = false;
      this.isExistente = false;
      this.type = null;
      this.seletorLabel = 'Tipo de componente';
    } else {
      this.setEstadoInicial();
    }
    
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
    this._appSrv.getTiposAplicativos().forEach((app) => {
      if (app.type === this.type) {
        this.seletorLabel = app.label;
      }
    })
  }
  
}