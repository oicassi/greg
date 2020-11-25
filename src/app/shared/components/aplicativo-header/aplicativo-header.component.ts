import { AplicativoBase } from '@models/aplicativo';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-aplicativo-header',
  templateUrl: './aplicativo-header.component.html',
  styleUrls: ['./aplicativo-header.component.scss']
})
export class AplicativoHeaderComponent implements OnInit {

  @Input() dados: AplicativoBase
  @Output() editar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cancelar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() salvar: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit() {
  }

  clickEditar(): void {
    this.editar.emit(true);
  }

  clickCancelar(): void {
    this.cancelar.emit(true);
  }

  clickSalvar(): void {
    this.salvar.emit(true);
  }

}
