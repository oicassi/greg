import { AplicativoBase } from '@models/aplicativo';
import { AplicativoService } from '@services/aplicativo.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-control',
  templateUrl: './edit-control.component.html',
  styleUrls: ['./edit-control.component.scss']
})
export class EditControlComponent implements OnInit {

  constructor(
    private _appSrv: AplicativoService
  ) { }

  ngOnInit() {
    // Ordena os aplicativos com base no order
    this.aplicativos = this.aplicativos.sort((a, b) => a.order - b.order);
  }

  /**
   * Getter da propriedade aplicativos
   */
  get aplicativos(): AplicativoBase[] {
    return this._appSrv.getAplicativos();
  }

  /**
   * Setter da propriedade aplicativos
   */
  set aplicativos(aplicativos: AplicativoBase[]) {
    this._appSrv.setAplicativos(aplicativos);
  }

  /**
   * Listener para o evento de drop do cdk drag and drop
   * @param event Evento
   */
  drop(event: CdkDragDrop<string[]>): void {
    console.log(this.aplicativos);
    moveItemInArray(this.aplicativos, event.previousIndex, event.currentIndex);
    for (let i = 0; i < this.aplicativos.length; i++) {
      this.aplicativos[i].order = i;
    }
    console.log('%cAplicativo reordenado com sucesso', 'color: purple');
    console.log(this.aplicativos);
  }
}