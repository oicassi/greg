import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../../models/card.model';
import { PagesService } from '../../_services/pages.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()dados: Card; 

  constructor(
  ) {
  }

  ngOnInit() {
  }


}
