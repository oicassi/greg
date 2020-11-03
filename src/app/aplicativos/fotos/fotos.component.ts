import { AplicativoFoto } from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.scss']
})
export class FotosComponent implements OnInit {

  @Input() dados: AplicativoFoto;
  constructor() { }

  ngOnInit() {
    console.log(`-- [Aplicativo Fotos] ${this.dados.component_name}`);
    console.log(this.dados);
    console.log('+----------------------------------------------------+');
  }

}
