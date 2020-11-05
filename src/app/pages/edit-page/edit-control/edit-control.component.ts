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

  onAplicativoAdicionado(): void {
    console.log('%cAplicativo adicionado com sucesso', 'color: green');
  }

  onAplicativoRemovido(): void {
    console.log('%cAplicativo removido com sucesso', 'color: orange');
  }

  onAplicativosReordenados(event: CdkDragDrop<any>): void {
    console.log(this.aplicativos);
    moveItemInArray(this.aplicativos, event.previousIndex, event.currentIndex);
    console.log('%cAplicativo reordenado com sucesso', 'color: purple');
    console.log(this.aplicativos);
  }
}
