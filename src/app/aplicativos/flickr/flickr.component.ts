import { AplicativoFlickr } from '@models/aplicativo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flickr',
  templateUrl: './flickr.component.html',
  styleUrls: ['./flickr.component.scss']
})
export class FlickrComponent implements OnInit {

  @Input() dados: AplicativoFlickr;

  constructor() { }

  ngOnInit() {
    console.log(`-- [Aplicativo Flickr] ${this.dados.component_name}`);
    console.log(this.dados);
    console.log('+----------------------------------------------------+');

  }
}
