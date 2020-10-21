import { Card } from '../../shared/models/card.model';
import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() dados: Card; 




}
