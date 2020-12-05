import { Validators, FormControl } from '@angular/forms';
import { AplicativoTexto } from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';
import { AplicativoGenericoComponent } from '@aplicativos/aplicativo-generico/aplicativo-generico.component';
import { AplicativoService } from '@services/aplicativo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Texto } from '@models/aplicativo-item';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.scss']
})
export class TextoComponent extends AplicativoGenericoComponent implements OnInit {

  @Input() dados: AplicativoTexto;
  dadosBkp: AplicativoTexto;

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
      'title0': [(this.dados.texto_array[0].title || ''),
      [Validators.required]],
      'body0': [(this.dados.texto_array[0].body || ''),
      [Validators.required]]
    })

    // Se tiver mais dados no texto array, adiciona os controladores no formulário
    if (this.dados.texto_array && this.dados.texto_array.length > 1) {
      for (let i = 1; i < this.dados.texto_array.length; i++) {
        this.form.addControl(`title${i}`, new FormControl(
          (this.dados.texto_array[i].title || ''),
          [Validators.required]
        ))
        this.form.addControl(`body${i}`, new FormControl(
          (this.dados.texto_array[i].body || ''),
          [Validators.required]
        ))
      }
    }
  }

  /**
   * Adiciona um texto no fim do texto_array
   */
  addTexto(): void {
    // Se já tiver 3 textos não adiciona
    if (this.dados.texto_array.length === 3) {
      return;
    }

    // Cria um novo objeto de texto e adiciona ao texto_array
    let novoTexto = new Texto();
    novoTexto.title = '';
    novoTexto.body = '';

    // Recupera o índice que será adicionado o elemento de texto
    const indice = this.dados.texto_array.length;

    this.dados.texto_array.push(novoTexto);

    // Adiciona o controle no form
    this.form.addControl(`title${indice}`, new FormControl(
      (this.dados.texto_array[indice].title || ''),
      [Validators.required]
    ))
    this.form.addControl(`body${indice}`, new FormControl(
      (this.dados.texto_array[indice].body || ''),
      [Validators.required]
    ))

  }

  /**
   * Remove o último texto adicionado
   */
  removeTexto(): void {
    // Se tiver apenas 1 texto não remove
    if (this.dados.texto_array.length === 1) {
      return;
    }
    
    // Recupera o índice do elemento que está sendo removido
    const indice = this.dados.texto_array.length - 1;

    // Remove o controle do formulário
    this.form.removeControl(`title${indice}`);
    this.form.removeControl(`body${indice}`);

    // Remove o último elemento do array de textos
    this.dados.texto_array.pop();
  }

  /**
   * Retorna as cores customizadas para as bordas do espaço do texto
   */
  customStyleItem(): any {
    const fgColor = this.dados.fgColor || '#444444';

    return {
      border: `2px solid ${fgColor}`,
      color: fgColor
    }
  }
}
