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
    this.printBagulhets();
    this.criaBackupDados();
    this.initForms
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
}