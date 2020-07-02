import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';

/**
 * Classe base com as informações mínimas para cada item de resumo
 */
export class ResumoItem {
  pos: number;
  assunto: string;
  body: string;
  edit: boolean;
}

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss'],
  animations: [
    trigger('animation', [
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate(('250ms ease-in'), style({
          height: 0,
          opacity: 0,
          transform: 'translateX(50%)'
        }))
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None

})
export class ResumoComponent implements OnInit {

  @Input() inputName: string;   // Input com as informações do usuário
  @Input() inputTitle: string;  // Input com o título do componente
  @ViewChild('base',{static:false})base: ElementRef;
  userName: string;
  title: string;
  columns: ResumoItem[] = []    // Itens de resumo
  columnsBkp: ResumoItem[] = [] // Backup dos resmos (para manter uma informação ao remover citens)
  colNum = 1;

  constructor() { }

  /**
   * Inicialização de um primeiro item de resumo
   */
  ngOnInit() {
    let ini: ResumoItem = new ResumoItem();
    ini.pos = 0;
    ini.assunto = `Meu assunto ${ini.pos}`;
    ini.body = 'Escreva o resumo sobre o assunto...'
    ini.edit = true;
    this.columns.push(ini);
    this.columnsBkp.push(ini);
  }

  /**
   * Atribuiçã das variáveis com base nos Inputs
   */
  ngAfterContentInit(): void {
    this.userName = this.inputName;
    this.title = this.inputTitle;
  }

  /**
   * Adiciona um item de resumo
   */
  addColumn() {
    let ini: ResumoItem = new ResumoItem();
    ini.pos = this.columns.length;
    ini.edit = true;
    if (this.columnsBkp[this.colNum]) {
      ini.assunto = this.columnsBkp[this.colNum].assunto;
      ini.body = this.columnsBkp[this.colNum].body;
    } else {
      ini.assunto = `Meu assunto ${ini.pos}`;
      ini.body = 'Escreva o resumo sobre o assunto...'
      this.columnsBkp.push(ini);
    }
    this.columns.push(ini);
    this.colNum++;
  }

  /**
   * Remove um item de resumo
   */
  removeColumn() {
    this.columns.splice(-1, 1);
    this.colNum--;
  }

  /**
   * Salva a informação de resumo dentro no array de itens de resumo
   * @param i Índice no array do item que está sendo salvo
   */
  save(i: number) {
    this.columns[i].edit = false;
    this.columnsBkp[i].assunto = this.columns[i].assunto;
    this.columnsBkp[i].body = this.columns[i].body;
  }

  /**
   * Habilita a edição para um ítem de resumo que já estava salvo
   * @param i Índice no array do item que está sendo habilitada a edição
   */
  edit(i: number) {
    this.columns[i].edit = true;
  }

  changeColor() {
    this.base.nativeElement.style.backgroundColor="blue";
  }
}
