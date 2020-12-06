import { AplicativoBase } from '@models/aplicativo';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AplicativosModels } from '@shared/constants/aplicativos';

@Component({
  selector: 'app-config-menu-comp',
  templateUrl: './config-menu-comp.component.html',
  styleUrls: ['./config-menu-comp.component.scss']
})
export class ConfigMenuCompComponent implements OnInit {

  textosInputApi = {
    label: 'Alterar username',
    placeholder: 'Insira seu username',
    modalLabel: 'Selecionar itens',
  }
  @Input() dados: AplicativoBase;
  @Input() hasCheckedApi: boolean;
  @Output() apiSubmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() colorChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() textCount: EventEmitter<string> = new EventEmitter<string>();
  @Output() modalOpen: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
    this.gerarTextosApi();
  }

  /**
   * Verifica se o menu de configuração deve exibir controles para tipo API
   */
  checkComponenteApi():boolean {
    if (AplicativosModels.TIPOS_API.includes(this.dados.type)) {
      return true;
    }
    return false
  }

  /**
   * Verifica se o menu de configuração deve exibir controles para acesso a modal
   */
  checkComponenteModal(): boolean {
    if (AplicativosModels.MODAL.includes(this.dados.type)) {
      return true;
    }
    return false
  }

  /**
   * Verifica se o menu de configuração deve exibir controles para texto
   */
  checkComponenteTexto(): boolean {
    if (AplicativosModels.TEXTOS.includes(this.dados.type)) {
      return true;
    }
    return false;
  }

  /**
   * Verifica se o menu de configuração deve exibir controles para controle de cor
   */
  checkComponenteCorEditavel(): boolean {
    if (AplicativosModels.COR_EDITAVEL.includes(this.dados.type)) {
      return true;
    }
    return false;
  }

  /**
   * Gera os textos que serão passados para o componente de input para busca na API
   */
  gerarTextosApi(): void {
    let apiLabel;
    AplicativosModels.TODOS.forEach(app => {
      if (app.type === this.dados.type) {
        apiLabel = app.label;
      }
    })
    this.textosInputApi.label = `Alterar username ${apiLabel}`;
    this.textosInputApi.placeholder = `Insira um username para o ${apiLabel}`;
    switch(this.dados.type) {
      case 'flickr':
        this.textosInputApi.modalLabel = 'Fotos';
        break;
      case 'fotos':
        this.textosInputApi.modalLabel = 'Fotos';
        break;
      case 'freesound':
        this.textosInputApi.modalLabel = 'Áudios';
        break;
      case 'github':
        this.textosInputApi.modalLabel = 'Repositórios';
        break;
      default:
        this.textosInputApi.modalLabel = 'Selecionar itens';
    }
  }

  /**
   * Handler para evento de submit do input da API
   * @param event texto que foi submetido no formulário
   */
  onUsernameSubmit(event: string): void {
    this.apiSubmit.emit(event);
  }

  /**
   * Handler para evento de clicar no botão para abrir modal
   */
  onModalButtonClick(): void {
    this.modalOpen.emit(this.dados.type);
  }

  /**
   * Handler para evento de clicar em um dos botões de adicionar ou remover texto
   * @param acao Ação de remover ou adicionar texto
   */
  countTexto(acao: string): void {
    this.textCount.emit(acao);
  }

  /**
   * Handler para alteração na cor de background ou foreground
   * @param event Evento de alteração da cor
   */
  onColorChange(event: any): void {
    this.colorChange.emit(event);
  }
}
