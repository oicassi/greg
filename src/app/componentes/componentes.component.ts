import { Info } from './../models/info.model';
import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Dropdown } from 'primeng/dropdown/dropdown';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.scss']
})
export class ComponentesComponent implements OnInit {

  @Output() componenteLigado : EventEmitter<Info[]> = new EventEmitter<Info[]>()  // Emissor para passar array atualizado de compoentes ligados ao App component
  @ViewChild('compSelector', {static: false}) dropdown: Dropdown;

  componentesSelecionados: Info[] = []  // Array de componentes selecionados
  comps: any[] = [];                    // Lista de componentes disponíveis
  compSelecionado: string = '';         // Componente selecionado no menu dropdown
  idGeral = 0;                          // Contador geral de componentes (talvez possa ser removido)

  constructor() {
  }

  /**
   * Apenas iniciar o array de componentes disponíveis
   */
  ngOnInit(): void {
    this.comps = [
      {label: 'Github', value:'github'},
      {label: 'Flickr', value:'flickr'},
      {label: 'Resumo', value:'resumo'},
      {label: 'Freesound', value: 'freesound'}
    ];
  }

  /**
   * Atribui o componente selecionado à variável correta (talvez possa ser removido)
   * @param event Componente selecionado
   * @param dropdown Referência ao menu dropdown
   */
  selecionarComponente(event: string, dropdown: Dropdown) {
    if (event) {
      this.compSelecionado = event;
    }
  }

  /**
   * Método para adicionar um componente ligado a lista e emiti-la para o App component
   * @param event Evento com as informações do componente que foi ligado
   */
  ligaComponente(event: Info) {
    this.compSelecionado = '';
    event.id = this.idGeral;
    this.idGeral++;
    this.componentesSelecionados.push(event);
    this.componenteLigado.emit(this.componentesSelecionados);
  }

  /**
   * Método para reordenar a lista de componentes e emiti-la para o App component quando ocorre evento de drag 'n drop
   * @param event Evento do drop do drag 'n drop
   */
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.componentesSelecionados, event.previousIndex, event.currentIndex);
    this.componenteLigado.emit(this.componentesSelecionados);
  }
}
