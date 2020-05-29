import { LoaderService } from './../../core/_services/loader.service';
import { ApiService } from './../../core/_services/api.service';

import { Component, OnInit, Input, ViewEncapsulation, ɵisBoundToModule__POST_R3__ } from '@angular/core';
import { MessageService } from 'primeng/api';

/**
 * Classe para o modelo básico de áudio
 */
export class Audio {
  name: string;
  description: string;
  url: string;
  tags: string[];
}


@Component({
  selector: 'app-freesound',
  templateUrl: './freesound.component.html',
  styleUrls: ['./freesound.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class FreesoundComponent implements OnInit {

  @Input() inputName: string;   // Input com as informações do usuário do flickr (nome ou email)
  @Input() inputTitle: string;  // Título do componente

  userName: string;
  title: string;
  errorMsg: string;

  // Especificas do freesound
  freesoundDescription: string;   // Descrição do perfil no freesound
  numAudios: number;              // Numero de audios no perfil
  urlPic: string;                 // URL da imagem de perfil
  urlProfile: string;             // URL para o perfil
  audios : Audio[] = [];          // Array de audios
  selectedAudio : Audio;          // Áudio selecionado da lista
  autoPlay : boolean = false;     // Opção de autoplay para quando troca de audio
  
  constructor(
    private _apiSrv: ApiService,
    private _msgSrv: MessageService,
    public loaderSrv: LoaderService) { 
    
  }

  /**
   * Inicialização de algumas variáveis
   */
  ngOnInit() {
    this.errorMsg = '';
    this.freesoundDescription = '';
    this.selectedAudio = new Audio();
  }

  /**
   * Inicialização de variáveis com base nos Inputs e busca de informações na API do flickr
   */
  ngAfterContentInit() {
    this.userName = this.inputName;
    this.title = this.inputTitle;
    this.loaderSrv.showLoader();
    this.setProfile();
  }

  /**
   * Função que faz a busca pelas informações de perfil e seta os atributos
   */
  async setProfile() {
    console.log('Seting Freesound Profile');
    let respProfile = await this._apiSrv.getFreesoundProfile(this.userName).toPromise();
    if (respProfile['detail'] && respProfile['detail'] != '') {
      console.log('Ocorreu erro ao setar perfil');
      this._msgSrv.add({severity:'error', summary:'Erro Perfil', detail: respProfile['detail']});
      this.loaderSrv.hideLoader();
      return;
    }
    console.log(respProfile);
    if (respProfile['about']) {
      this.freesoundDescription = (respProfile['about'].length > 50 ? 
        (respProfile['about'].substr(0, 50) + '...') : respProfile['about']);
    } else {
      this.freesoundDescription = 'Sem descrição'
    }
    this.urlProfile = respProfile['url'];
    this.urlPic = respProfile['avatar']['large']; // A imagem está em 70 x 70 (desânimo de vida mds, vai ficar uma porra);
    this.numAudios = respProfile['num_sounds'];
    console.log('Fim set perfil');
    this.fetchAudios();
   }

  /**
   * Função para buscar a lista de informações dos Audios
   * TODO: No momento serão listados apenas 50 audios... Ver o que será feito em relação a isso
   */
  async fetchAudios() {
    console.log('Fetching audios');
    let resp = await this._apiSrv.getFreesoundAudios(this.userName).toPromise();
    if (resp['detail'] && resp['detail'] != '') {
      this._msgSrv.add({severity:'error', summary:'Erro busca áudio', detail: resp['detail']});
      this.loaderSrv.hideLoader();
      return;
    }
    if (resp == undefined || !resp || !resp['count']) {
      console.log('Sem resultados')
      this.loaderSrv.hideLoader();
      return;
    }
    console.log('Deu boa as info de buscar os audios');
    let audios = resp['results'];
    let limit = (audios.length > 50 ? 50 : audios.length);
    for (let i = 0; i < limit; i++) {
      let audio = new Audio();
      audio.tags = [];
      audio.name = audios[i].name;
      if (audios[i].description) {
        audio.description = (audios[i].description.length > 60 ? (audios[i].description.substr(0, 60) + '...') : audios[i].description);
      } else {
        'Áudio sem descrição';
      }
      audio.url = audios[i].previews['preview-lq-mp3'];
      let tags: string[] = audios[i].tags;
      tags.forEach(tag => {
        audio.tags.push(tag);
      })
      this.audios.push(audio);
    }
    this.selectedAudio = this.audios[0]
    this.loaderSrv.hideLoader();  
    console.log(this.audios);
    console.log('Fim fetchAudio');
  }

  /**
   * Método para selecionar novo áudio a partir da seleção do html
   * @param event Áudio vindo como evento do html
   */
  trocaAudio(event: Audio) {
    this.selectedAudio = event;
    this.autoPlay = true;
    
  }
}
