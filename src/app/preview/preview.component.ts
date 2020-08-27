import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() inputName: string;   // Recebe a informação de usuário (user name ou email, por exemplo)
  @Input() inputTitle: string;  // Recebe o título do componente
  @Input() inputType: string;   // Recebe o tipo do componente
  @Input() globalId: number;    // Recebe o id geral do elemento
  @Input() inputBgColor: string // Recebe a cor de fundo do componente

  @Output() colorUpdate: EventEmitter<any> = new EventEmitter();

  userName: string;
  title: string;
  type: string;
  id: number;
  bgColor: string;
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Inicializa as variáveis básicas de um componente para passa-los atraés do Input dos mesmos
   */
  ngAfterContentInit(): void {
    this.userName = this.inputName;
    this.title = this.inputTitle;
    this.type = this.inputType;
    this.id = this.globalId;
    this.bgColor = this.inputBgColor;
    console.log('tipo: ' + this.type);
  }

  updateBgColor(event) {
    this.colorUpdate.emit(event);
  }
}
