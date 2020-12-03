import { Foto } from '@models/aplicativo-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-container',
  templateUrl: './photo-container.component.html',
  styleUrls: ['./photo-container.component.scss']
})
export class PhotoContainerComponent implements OnInit {

  @Input() photoArray: Foto[];
  @Input() fgColor: string;

  constructor() { }

  ngOnInit() {
    console.log('OPAAAAA');
    console.log(this.photoArray);
  }

}
