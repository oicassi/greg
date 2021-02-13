import { AlertService } from '@shared-components/alert/alert.service';
import { FileGregs } from './../../shared/models/file-greg';
import { AplicativoGenericoComponent } from '@aplicativos/aplicativo-generico/aplicativo-generico.component';
import { Component, Input, OnInit } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AplicativoBio } from '@models/aplicativo';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BioComponent extends AplicativoGenericoComponent implements OnInit {

  @Input() dados: AplicativoBio;
  dadosBkp: AplicativoBio;

  // Formulário;
  form: FormGroup;

  constructor(
    _appServ: AplicativoService,
    private _fb: FormBuilder,
    protected alertService: AlertService,
  ) {
    super(_appServ, alertService);
  }

  ngOnInit() {
    this.dados.texto.title = '';
    this.criaBackupDados();
    this.initForms();
  }

  /**
    * Inicializa os formulários dos textos
    */
  initForms(): void {
    // Inicializa ao menos um formulário de texto
    this.form = this._fb.group({
      'texto': [(this.dados.texto.body || ''),
      [Validators.required]],
    });
    
  }

  /**
   * Retorna as cores customizadas para as bordas do espaço do texto
   */
  getCustomElementTitleStyle() {
    let color = this.dados.fgColor || '#444444';
    return {
      'border-bottom':`1px solid ${color}`
    }
  }

  /**
   * Salvar o texto e o título editado
   */
  salvarTexto(): void {

    // Marcar o controle que que está sendo salvo como touched e dirty
    let controlTexto = this.form.get('texto');
    controlTexto.markAsDirty({ onlySelf: true });
    controlTexto.markAsTouched({ onlySelf: true });

    // Se tiver algum erro, cancela a ação
    if (this.form.get('texto').errors) {
      return;
    }

    // Recupera o texto sendo salvo
    const texto = this.form.get('texto').value;

    // Atualiza a informação
    this.dados.texto.body = texto;
    this.dados.texto.title = null;
  }

  /**
   * Cancela a edição do texto e título e retorna os dados ao estado original
   */
  cancelarTexto(): void {
    this.form.get('texto').setValue(this.dados.texto.body);
  }

  /**
   * Limpa o texto
   * @param indice Índice do texto sendo limpo 
   */
  limparTexto(): void {
    this.form.get('texto').setValue('');
  }

  /**
   * Handler ao clicar no botão de input arquivo
   */
  onInputTrocarFoto(event: FileGregs):void {
    this.dados.imagem = event;
    this.dadosBkp.imagem = event;
  }

  /**
   * Hoook antes de terminar a edição do componente
   */
  antesConfirmarEdicao(): void {
    this.verificarCamposFormularios(this.form);
    if (this.form.status === 'INVALID') {
      throw new Error('Preenchimento incorreto');
    }
  }

  /**
   * Verifica se houve alterações no texto e se habilita ou não os botões de salvar e cancelar
   */
  checkAcoesDisabled(): boolean{
    let texto = this.form.get('texto').value;

    if (this.dados.texto.body !== texto) {
        return false;
      }
    return true;
  }

  getTextoParsed(texto: string) {
    return texto.replace(new RegExp('\n', 'g'), "<br />")
  }
}