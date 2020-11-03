import { FactoryService } from '@services/factory.service';
import { AplicativoService } from '@services/aplicativo.service';
import { Component, OnInit } from '@angular/core';
import { AplicativoBase } from '@models/aplicativo';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  // appList: AplicativoBase[] = [];
  loading: boolean = false;

  constructor(
    private _appService: AplicativoService,
    public factoryService: FactoryService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    setTimeout(() => {
      // this.appList = this._appService.getSuperMockData();
      // this.ordenarAppList();
      this.loading = false;
    }, 1000)
    setTimeout(() => {
      console.log('%cFOIIIIIIII', 'color:purple');
      this._appService.addQualquerCoisa();
    }, 5000);
  }

  ordenarAppList(list: AplicativoBase[]): void {
    list.sort((a, b) => a.order - b.order);
  }


  get appList() {
    let lista =  this._appService.getSuperMockData();
    this.ordenarAppList(lista);
    return lista;

  }



}
