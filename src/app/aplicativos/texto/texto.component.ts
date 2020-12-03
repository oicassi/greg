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
    this.criaBackupDados
    console.log(`-- [Aplicativo Texto] ${this.dados.component_name}`);
    console.log(this.dados);
    console.log('+----------------------------------------------------+');
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

    this.dados.texto_array.push(novoTexto);

    // Adiciona o controle no form
    this.form.addControl(`title${this.dados.texto_array.length}`, new FormControl(
      (this.dados.texto_array[this.dados.texto_array.length].title || ''),
      [Validators.required]
    ))
    this.form.addControl(`body${this.dados.texto_array.length}`, new FormControl(
      (this.dados.texto_array[this.dados.texto_array.length].body || ''),
      [Validators.required]
    ))

  }

  /**
   * Remove o último texto adicionado
   */
  removeTexto(): void {

  }

}
