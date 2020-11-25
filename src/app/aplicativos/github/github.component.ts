import { AplicativoGenericoApiComponent } from '@aplicativos/aplicativo-generico-api/aplicativo-generico-api.component';
import { AplicativoGithub } from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent extends AplicativoGenericoApiComponent implements OnInit {

  @Input() dados: AplicativoGithub;
  dadosBkp: AplicativoGithub;
  
  constructor(
    _appServ: AplicativoService,
  ) {
    super(_appServ);
  }

  ngOnInit() {
    this.setEstadoAplicativo();
    this.criaBackupDados();
    console.log(this.dados);
  }
}
