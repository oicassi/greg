import { FileGregs } from './../../shared/models/file-greg';
import { AplicativoGenericoComponent } from '@aplicativos/aplicativo-generico/aplicativo-generico.component';
import { Component, Input, OnInit } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AplicativoBio } from '@models/aplicativo';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent extends AplicativoGenericoComponent implements OnInit {

  @Input() dados: AplicativoBio;
  dadosBkp: AplicativoBio;

  // Formulário;
  form: FormGroup;

  constructor(
    _appServ: AplicativoService,
    private _fb: FormBuilder,
  ) {
    super(_appServ);
  }

  ngOnInit() {
    this.criaBackupDados();
    this.initForms();
  }

  /**
    * Inicializa os formulários dos textos
    */
  initForms(): void {
    // Inicializa ao menos um formulário de texto
    this.form = this._fb.group({
      'texto': [(this.dados.texto || ''),
      [Validators.required]],
    })
  }

  /**
   * Salvar o texto e o título editado
   */
  salvarTexto(): void {

    // Marcar o controle que que está sendo salvo como touched e dirty
    let control = this.form.get('texto');
    control.markAsDirty({ onlySelf: true });
    control.markAsTouched({ onlySelf: true });

    // Se tiver algum erro, cancela a ação
    if (this.form.get('texto').errors ) {
      return;
    }

    // Recupera o texto sendo salvo
    const texto = this.form.get('texto').value;

    // Atualiza a informação
    this.dados.texto = texto;
  }

  /**
   * Cancela a edição do texto e título e retorna os dados ao estado original
   * @param indice Índice do texto e título sendo editados
   */
  cancelarTexto(): void {
    this.form.get('texto').setValue(this.dados.texto);
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
    console.log('Olha o que chegou no input trocar foto');
    console.log(event);
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

    if (this.dados.texto !== texto) {
        return false;
      }
    return true;
  }
}