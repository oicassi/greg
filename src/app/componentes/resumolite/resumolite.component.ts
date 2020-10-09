import { MessageService } from 'primeng/api';
import { Info } from 'src/app/shared/models/info.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-resumolite',
  templateUrl: './resumolite.component.html',
  styleUrls: ['./resumolite.component.scss'],
  providers: [MessageService],
})
export class ResumoliteComponent implements OnInit {

  @Output() createComponent: EventEmitter<Info>= new EventEmitter<Info>() // Emissor de evento quando um componente é selecionado
  @Input() inputName: string;                                             // Nome que é recebido quando o componente já está criado
  @Input() inputTitle: string;                                            // Título do componente que é recebido quando o componente já está criado
  @Input() inputType: string;                                             // Tipo do componente que é recebido quando o componente já está criado
  @Input() isEdit: boolean;                                               // Informação se o editor do componente está ativado ou não

  email: string;
  componentName: string;
  info: Info;
  edit: boolean;
  tipo: string;

  constructor(private _msgSrv: MessageService) { }

  ngOnInit(): void {
  }

  /**
   * Inicialização das variávies com base nos Inputs (detalhe para email que não é necessário, por enquanto, nesse componente)
   */
  ngAfterContentInit() {
    this.email = (this.inputName || 'N/A');
    this.componentName = (this.inputTitle || 'Meu Resumo');
    this.tipo = this.inputType;
    this.edit = this.isEdit;
  }

  /**
   * Liga um componente e emite o evento do componente criado
   */
  emitirEvento() {
    if (!this.componentName) {
      console.log('Não foi possível ligar o componente');
      this._msgSrv.add({severity:'warn', summary: 'Erro', detail:'Forneça um nome do componente para prosseguir'});
      return;
    }
    this.info = new Info();
    this.info.id = -1;
    this.info.user = this.email;
    this.info.titulo = this.componentName;
    this.info.tipo = this.tipo;
    this.info.bgColor = 'default';
    this.createComponent.emit(this.info);
  }
}
