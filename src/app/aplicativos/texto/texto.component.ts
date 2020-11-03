import { AplicativoTexto } from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.scss']
})
export class TextoComponent implements OnInit {

  @Input() dados: AplicativoTexto
  constructor() { }

  ngOnInit() {
    console.log(`-- [Aplicativo Texto] ${this.dados.component_name}`);
    console.log(this.dados);
    console.log('+----------------------------------------------------+');
  }

}
