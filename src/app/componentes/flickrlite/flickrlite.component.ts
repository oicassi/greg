import { MessageService } from 'primeng/api';
import { Info } from 'src/app/shared/models/info.model';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Dropdown } from 'primeng/dropdown/dropdown';

@Component({
  selector: 'app-flickrlite',
  templateUrl: './flickrlite.component.html',
  styleUrls: ['./flickrlite.component.scss'],
  providers: [MessageService],
})
export class FlickrliteComponent implements OnInit {

  @ViewChild('loginSelector', {static: false}) dropdown: Dropdown;        // Referência ao menu dropdown
  @Output() createComponent: EventEmitter<Info>= new EventEmitter<Info>() // Emissor de evento quando um componente é selecionado
  @Input() inputName: string;                                             // Nome que é recebido quando o componente já está criado
  @Input() inputTitle: string;                                            // Título do componente que é recebido quando o componente já está criado
  @Input() inputType: string;                                             // Tipo do componente que é recebido quando o componente já está criado
  @Input() isEdit: boolean;                                               // Informação se o editor do componente está ativado ou não

  logins : any[] = [];
  email: string;
  componentName: string;
  info: Info;
  edit: boolean;
  tipo: string;
  loginOpcao: string;

  constructor(private _msgSrv: MessageService) { }

  /**
   * Inicia a lista de opções de forma de login e a opção selecionada como nula
   */
  ngOnInit(): void {
    this.logins = [
      {label: 'email', value:'email'},
      {label: 'Email', value: 'Email'}
    ]
    this.loginOpcao = ''
  }

  /**
   * Inicializa as variáveis de nome e título conforme foram recebidas nos Inputs
   */
  ngAfterContentInit() {
    this.email = this.inputName
    if (this.email) {
      this.email = this.email.split(';;')[1];
    }
    this.componentName = (this.inputTitle || 'Meu Flickr');
    this.tipo = this.inputType;
    this.edit = this.isEdit;
  }

  /**
   * Atribui a variável o tipo de login selecionado
   * @param event Valor do login selecionado
   * @param dropdown Referência ao menu dropdown
   */
  selecionarLogin(event: string, dropdown: Dropdown) {
    if (event) {
      this.loginOpcao = event;
    }
  }

  /**
   * Liga um componente e emite um evento de que o mesmo foi criado
   */
  emitirEvento() {
    if (!this.email) {
      console.log('Não foi possível ligar o componente');
      this._msgSrv.add({severity:'warn', summary: 'Erro', detail:'Forneça um Email/email para prosseguir'});
      return;
    }
    this.info = new Info();
    this.info.id = -1;
    this.info.user = `${this.loginOpcao};;${this.email}`;
    this.info.titulo = this.componentName;
    this.info.tipo = this.tipo;
    this.info.bgColor = 'default';
    this.createComponent.emit(this.info);
  }
}
