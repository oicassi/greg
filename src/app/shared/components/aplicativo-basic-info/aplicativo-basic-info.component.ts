import { Component, Input, OnInit } from '@angular/core';
import { AplicativoBase } from '@models/aplicativo';

@Component({
  selector: 'app-aplicativo-basic-info',
  templateUrl: './aplicativo-basic-info.component.html',
  styleUrls: ['./aplicativo-basic-info.component.scss']
})
export class AplicativoBasicInfoComponent implements OnInit {

  @Input() username: string;
  @Input() profile_url: string;
  @Input() description: string;
  @Input() fgColor: string;

  constructor() { }

  ngOnInit() {
  }
}
