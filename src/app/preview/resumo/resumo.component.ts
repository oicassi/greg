import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { CustomizeService } from 'src/app/core/_services/customize.service';
import { PreviewService } from 'src/app/core/_services/preview.service';

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
export class ResumoComponent implements OnInit, AfterViewInit {

  @Input() inputName: string;   // Input com as informações do usuário
  @Input() inputTitle: string;  // Input com o título do componente
  @Input() inputId: number      // Input com o id do componente
  @Input() inputBgColor: string // Input com a cor do backgorund do componente

  @Output() colorChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('base',{static:false})base: ElementRef;
  userName: string;
  title: string;
  id: number;
  bgColor: string;
  showConfigDialog: boolean = false;


  columns: ResumoItem[] = []    // Itens de resumo
  columnsBkp: ResumoItem[] = [] // Backup dos resmos (para manter uma informação ao remover citens)
  colNum = 1;

  constructor(
    private _custmSrv:CustomizeService,
    private _prevSrv:PreviewService
  ) { }

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
    this.id = this.inputId;
    this.bgColor = this.inputBgColor;
    
  }

  ngAfterViewInit() {
    if (this.bgColor !== 'default') {
      this.changeBgColor(this.bgColor);
    }
    if (this._prevSrv.getResumos(this.id) && this._prevSrv.getResumos(this.id).length > 0) {
      this.columns = this._prevSrv.getResumos(this.id);
      this.columns.forEach(col => col.edit = false)
    }
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
    this._prevSrv.setResumos(this.id, this.columns);
  }

  /**
   * Habilita a edição para um ítem de resumo que já estava salvo
   * @param i Índice no array do item que está sendo habilitada a edição
   */
  edit(i: number) {
    this.columns[i].edit = true;
  }

  openConfig() {
    this.showConfigDialog = !this.showConfigDialog;
  }

  changeBgColor(color:string = null) {
    if (!color || color === 'default') {
      console.log('Cor não alterada');
      return;
    }
    let cor = this._custmSrv.getHexaColor(color);
    this.base.nativeElement.style.backgroundColor = cor;
    this.bgColor = color; 
    if (this.showConfigDialog) {
      this.openConfig();
    }
    this.emitBgChange(color);
  }

  emitBgChange(color:string) {
    let event = {
      color:color,
      id:this.id
    }
    this.colorChange.emit(event);
  }
}
