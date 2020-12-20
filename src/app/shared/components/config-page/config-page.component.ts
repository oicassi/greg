import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserPageGlobal } from '@models/user';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss']
})
export class ConfigPageComponent implements OnInit {

  @Input() dados: UserPageGlobal;
  @Output() colorChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Handler para alteração na cor de background 
   * @param event Evento de alteração da cor
   */
  onColorChange(event: any): void {
    this.colorChange.emit(event.value);
  }

}
