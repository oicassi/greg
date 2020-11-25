import { AplicativoGenericoComponent } from '@aplicativos/aplicativo-generico/aplicativo-generico.component';
import { Component, Input, OnInit } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';
import { AplicativoApi } from '@models/aplicativo';

@Component({
  selector: 'app-aplicativo-generico-api',
  template: `<ng-template></ng-template>`
})
export class AplicativoGenericoApiComponent extends AplicativoGenericoComponent implements OnInit {

  @Input() dados: AplicativoApi;
  dadosBkp: AplicativoApi;

  // Controle de estado
  hasCheckedApi = false;

  constructor(
    _appServ: AplicativoService,
  ) {
    super(_appServ);
  }

  ngOnInit() {
    this.setEstadoAplicativo();
  }

  /**
   * Verifica o estado inicial do aplicativo
   */
  setEstadoAplicativo(): void {
    if (this.dados.username &&
      this.dados.order !== undefined &&
      this.dados.order !== null
    ) {
      this.hasCheckedApi = true;
    }
  }

}
