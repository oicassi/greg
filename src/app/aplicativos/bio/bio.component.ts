import { AplicativoGenericoComponent } from '@aplicativos/aplicativo-generico/aplicativo-generico.component';
import { Component, OnInit } from '@angular/core';
import { AplicativoService } from '@services/aplicativo.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent extends AplicativoGenericoComponent implements OnInit {

  constructor(
    _appServ: AplicativoService,
    private _fb: FormBuilder,
  ) {
    super(_appServ);
  }

  ngOnInit() {
  }

}
