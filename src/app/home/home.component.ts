import { Component, OnInit } from '@angular/core';
import { Info } from '../models/info.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{


  title = 'greg-v01';
  compsLigados: Info[] = [];  // Lista dos componentes ligados para serem exibidos no preview

  /**
   * Metodo executado quando um componente é ligado e então o array de componente ligados é atualizado
   * @param event Array de componentes ligados passado por event emitter
   */
  ligarComponente(event) {
    this.compsLigados = event;
    console.log('Componentes ligados');
    console.log(this.compsLigados)
  }

  /**
   * Metodo para mudança de temas (254% experimental e com bugs)
   * @param tema Nome do tema que será aplicado
   */
  mudarTema(tema: string) {
    this.trans();
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem('temaAplicacao', tema);
  }

  /**
   * Método para aplicar classe de transição na mudança de temas
   */
  trans() {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition');
    }, 600);
  }
}
