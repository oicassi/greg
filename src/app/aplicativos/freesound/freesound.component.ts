import { AplicativoFreesound } from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-freesound',
  templateUrl: './freesound.component.html',
  styleUrls: ['./freesound.component.scss']
})
export class FreesoundComponent implements OnInit {

  @Input() dados: AplicativoFreesound;
  constructor() { }

  ngOnInit() {
    console.log(`-- [Aplicativo Freesound] ${this.dados.component_name}`);
    console.log(this.dados);
    console.log('+----------------------------------------------------+');
  }

}
