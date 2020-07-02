import { Component, OnInit } from '@angular/core';
import { Info } from '../models/info.model';
import { Router } from '@angular/router';
import { PreviewService } from '../core/_services/preview.service';

@Component({
  selector: 'app-fullpreview',
  templateUrl: './fullpreview.component.html',
  styleUrls: ['./fullpreview.component.scss']
})
export class FullpreviewComponent implements OnInit {

  compsLigados: Info[] = [];
  constructor(
    private router: Router,
    private _prevSrv: PreviewService
  ) { }

  ngOnInit() {
    this.compsLigados = this._prevSrv.getCompsLigados();
    console.log('componentes no full');
    console.log(this.compsLigados);
  }

}
