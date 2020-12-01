import { Foto } from '@models/aplicativo-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.scss']
})
export class PhotoItemComponent implements OnInit {

  @Input() foto: Foto

  constructor() { }

  ngOnInit() {
  }

}
