import { LoaderService } from './../../core/_services/loader.service';
import { ApiService } from './../../core/_services/api.service';
import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomizeService } from 'src/app/core/_services/customize.service';

/**
 * Classe para o modelo básico de foto exibida
 */
export class Foto {
  title: string;
  description: string;
  source: string;
}


@Component({
  selector: 'app-flickr',
  templateUrl: './flickr.component.html',
  styleUrls: ['./flickr.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class FlickrComponent implements OnInit, AfterViewInit {

  @Input() inputName: string;   // Input com as informações do usuário do flickr (nome ou email)
  @Input() inputTitle: string;  // Título do componente
  @Input() inputId: number      // Input com o id do componente
  @Input() inputBgColor: string // Input com a cor do backgorund do componente

  @Output() colorChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('base',{static:false})base: ElementRef;

  email: string;
  title: string;
  id: number;
  bgColor: string;
  errorMsg: string;
  showConfigDialog: boolean = false;

  // Especificas do flickr
  flickrName: string;         // Nome exibido no flickr
  flickrDescription: string;  // Descrição do perfil no flickr
  flickrAlias: string;        // Alias do flickr
  numFotos: number;           // Numero de fotos no perfil
  nsid: string;               // Identificador iterno de usuário (utilizado no flickr)
  iconServer: string;         // Numero do server para localizar a imagem de perfil
  iconFarm: string;           // Número da farm para localizar a imagem de perfil
  urlPic: string;             // URL da imagem de perfil
  urlProfile: string;         // URL para o perfil
  fotos : Foto[] = [];        // Array de fotos carregadas
  
  constructor(
    private _apiSrv: ApiService,
    private _msgSrv: MessageService,
    public loaderSrv: LoaderService,
    private _custmSrv:CustomizeService) { 
    
  }

  /**
   * Inicialização de algumas variáveis
   */
  ngOnInit() {
    this.errorMsg = '';
    this.flickrDescription = '';
    this.flickrName = '';
  }

  /**
   * Inicialização de variáveis com base nos Inputs e busca de informações na API do flickr
   */
  ngAfterContentInit() {
    console.log('flickr afterContent');
    this.email = this.inputName;
    this.title = this.inputTitle;
    this.id = this.inputId;
    this.bgColor = this.inputBgColor;
   
    this.loaderSrv.showLoader();
    this.setProfile();
  }

  ngAfterViewInit() {
    if (this.bgColor !== 'default') {
      this.changeBgColor(this.bgColor);
    }
  }

  /**
   * Função que faz a busca pelas informações de perfil e seta os atributos
   */
  async setProfile() {
    let respNsid = await this._apiSrv.getFlickrNsid(this.email).toPromise();
    if (respNsid['stat'] == 'fail') {
      console.log('Ocorreu erro ao setar perfil');
      this._msgSrv.add({severity:'error', summary:'Erro Perfil', detail: respNsid['message']});
      this.loaderSrv.hideLoader();
      return;
    }
    console.log(respNsid);
    let resp = await this._apiSrv.getFlickrProfile(respNsid['user']['nsid']).toPromise();
    if (resp['stat'] == 'fail') {
      console.log('Ocorreu erro ao setar perfil (NSID)');
      this._msgSrv.add({severity:'error', summary:'Erro Perfil', detail: resp['message']});
      this.loaderSrv.hideLoader();
      return;
    }
    console.log(resp);
    this.flickrName = resp['person']['email']['_content'];
    this.flickrDescription = resp['person']['description']['_content'];
    this.flickrAlias = resp['person']['path_alias'];
    this.nsid = (resp['person']['nsid'] || this.flickrName);
    this.iconServer = resp['person']['iconserver'];
    this.iconFarm = resp['person']['iconfarm'].toString();
    this.urlProfile = resp['person']['profileurl']['_content'];
    this.urlPic = `http://farm${this.iconFarm}.staticflickr.com/${this.iconServer}/buddyicons/${this.nsid}.jpg`;
    this.numFotos = resp['person']['photos']['count']['_content'];

    console.log('url da foto');
    console.log(this.urlPic);
    this.fetchFotos();

   }

  /**
   * Função para buscar a lista de informações das fotos
   * TODO: No momento serão listadas apenas 20 fotos... Ver o que será feito em relação a isso
   */
  async fetchFotos() {
    let resp = await this._apiSrv.getFlickrPhotos(this.nsid).toPromise();
    if (resp['stat'] == 'fail') {
      this._msgSrv.add({severity:'error', summary:'Erro busca fotos', detail: resp['message']});
      this.loaderSrv.hideLoader();
      return;
    }
    console.log('Deu boa as info de buscar as fotos');
    let fotos = resp['photos']['photo'];
    let limit = (fotos.length > 50 ? 50 : fotos.length);
    for (let i = 0; i < limit; i++) {
      let foto = new Foto();
      foto.title = fotos[i].title;
      foto.description = `Foto ${fotos[i].title} de ${this.flickrName}`;
      foto.source = `https://farm${fotos[i].farm}.staticflickr.com/${fotos[i].server}/${fotos[i].id}_${fotos[i].secret}.jpg`;
      this.fotos.push(foto);
    }
    this.loaderSrv.hideLoader();  
    console.log(this.fotos);
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
