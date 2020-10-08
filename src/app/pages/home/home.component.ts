import { PreviewService } from './../../core/_services/preview.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Info } from 'src/app/shared/models/info.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{


  title = 'greg-v01';
  compsLigados: Info[] = [];  // Lista dos componentes ligados para serem exibidos no preview

  constructor(
    private router: Router,
    private _prevSrv: PreviewService
    ) {
    
  }

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

  updateComponentBgColor(event) {
    const {id, color} = event;

    let i = this.compsLigados.findIndex(comp => comp.id === id);
    if (i > -1) {
      this.compsLigados[i].bgColor = color;
    }
    console.log("atualizado cor");
    console.log(this.compsLigados);
  }

  openFullPreview() {
    this._prevSrv.setCompsLigados(this.compsLigados);
    this.router.navigate(["fullpreview"]);
  }
}
