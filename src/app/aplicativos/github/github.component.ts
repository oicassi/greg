import { AplicativoGithub } from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {

  @Input() dados: AplicativoGithub
  constructor() { }

  ngOnInit() {
    console.log(`-- [Aplicativo Github] ${this.dados.component_name}`);
    console.log(this.dados);
    console.log('+----------------------------------------------------+');
  }

}
