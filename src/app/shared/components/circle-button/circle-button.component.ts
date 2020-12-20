import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle-button',
  templateUrl: './circle-button.component.html',
  styleUrls: ['./circle-button.component.scss']
})
export class CircleButtonComponent implements OnInit {

  @Input() icon: string;
  @Input() color: string;
  class: string;

  constructor() { }

  ngOnInit() {
    if (!this.icon) {
      this.icon = 'done';
    }

    if (!this.color) {
      this.color = 'secondary';
    }

    this.class = `btn-${this.color}-icon`;
  }

}
