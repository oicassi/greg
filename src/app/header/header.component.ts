import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown/dropdown';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>(); // Emissor do evento de mudança de tema da aplicação
  @ViewChild('acaoSelector', {static: false}) dropdown: Dropdown;           // Referência ao menu dropdown do usuário

  acoes: any[] = [];
  userName: string;
  acaoSelecionada: string;
  temaAtual: string;
  
  /**
   * Carrega infos básicas como tema atual e nome
   */
  constructor() {
    this.temaAtual = document.documentElement.getAttribute('data-theme');
    this.userName = 'Gregrzito';
    this.acoes = [
      {label: this.userName, value: null}, 
      {label: 'Mudar tema', value:'tema'},
      {label: 'Logout', value:'logout'}
    ];
  }

  ngOnInit(): void {
  }

  /**
   * Executa alguma ação quando há alteração no menu dropdown do usuário
   * @param event 
   */
  executarAcao(event) {
    console.log('+++ Ação +++');
    console.log(this.acaoSelecionada);
    if (this.acaoSelecionada == 'tema') {
      let t = this.temaAtual;
      this.temaAtual = (this.temaAtual == 'light' ? 'dark' : 'light');
      this.acaoSelecionada = '';
      this.dropdown.clear(null);
      this.themeChange.emit((t == 'light' ? 'dark' : 'light'));
    }
  }
}
