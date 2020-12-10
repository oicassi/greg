import { AplicativoGenericoApiComponent } from '@aplicativos/aplicativo-generico-api/aplicativo-generico-api.component';
import { AplicativoFlickr } from '@models/aplicativo';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';

@Component({
  selector: 'app-flickr',
  templateUrl: './flickr.component.html',
  styleUrls: ['./flickr.component.scss']
})
export class FlickrComponent extends AplicativoGenericoApiComponent implements OnInit {

  @Input() dados: AplicativoFlickr;
  dadosBkp: AplicativoFlickr;

  constructor(
    _appServ: AplicativoService,
  ) {
    super(_appServ);
  }

  ngOnInit() {
    this.setEstadoAplicativo();
    this.criaBackupDados();
  }

  /**
   * Handler ao clicar no botão de abrir o modal
   */
  onOpenModal():void {
    console.log(`[${this.dados.component_name}] clicado no botão de abrir modal`);
  }
}
