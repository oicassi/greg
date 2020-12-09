import { FactoryService } from '@services/factory.service';
import { AplicativoService } from '@services/aplicativo.service';
import { Component, OnInit } from '@angular/core';
import { AplicativoBase } from '@models/aplicativo';

@Component({
  selector: 'app-edit-preview',
  templateUrl: './edit-preview.component.html',
  styleUrls: ['./edit-preview.component.scss']
})
export class EditPreviewComponent implements OnInit {

  constructor(
    private _appSrv: AplicativoService,
    public factorySrv: FactoryService
  ) { }

  ngOnInit() {
  }

  /**
   * Setter do aplicativo
   */
  set aplicativos(aplicativos: AplicativoBase[]) {
    this._appSrv.setAplicativos(aplicativos);
  }

  /**
   * Getter dos aplicativos
   */
  get aplicativos(): AplicativoBase[] {
    let apps = this._appSrv.getAplicativos();
    apps.forEach((app, i) => app.order = i);
    this.setAplicativosEditable(apps);
    return apps;
  }

  /**
   * Setar que os aplicativos podem ser editados
   */
  setAplicativosEditable(apps: AplicativoBase[]): void {
    apps.forEach((app) => app.isEditable = true);
  }

}
