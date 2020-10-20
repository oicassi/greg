import { LoaderService } from './../../core/_services/loader.service';
import { ApiService } from './../../core/_services/api.service';


import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomizeService } from 'src/app/core/_services/customize.service';

/**
 * Classe com informações básicas de um repositório
 */
export class Repo {
  name: string;
  description: string;
  url: string;
  data: string;
}

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss'],
  providers: [MessageService],
})
export class GithubComponent implements OnInit, AfterViewInit {

  @Input() inputName: string;   // Input com as informações de usuário
  @Input() inputTitle: string;  // input com o título do componente
  @Input() inputId: number      // Input com o id do componente
  @Input() inputBgColor: string // Input com a cor do backgorund do componente

  @Output() colorChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('base',{static:false})base: ElementRef;

  email: string;
  title: string;
  id: number;
  bgColor: string;
  showConfigDialog: boolean = false;

  urlPic: string;
  urlProfile: string;
  errorMsg: string;
  repos: Repo[] = [];

  constructor(
    private _apiSrv: ApiService,
    private _msgSrv: MessageService,
    public loaderSrv: LoaderService,
    private _custmSrv:CustomizeService) { 

  }

  /**
   * Inicialização da errorMsg como nula
   */
  ngOnInit() {
    this.errorMsg = '';
  }

  /**
   * Inicialização das variáveis com base nos Inputs e busca de dados na API do Github
   */
  ngAfterContentInit(): void {
    this.loaderSrv.showLoader;
    this.email = this.inputName;
    this.title = this.inputTitle;
    this.id = this.inputId;
    this.bgColor = this.inputBgColor;
    this.fetchRepoData()
  }

  ngAfterViewInit() {
    if (this.bgColor !== 'default') {
      this.changeBgColor(this.bgColor);
    }
  }

  /**
   * Busca de dados dos repositórios na API do Github
   */
  async fetchRepoData() {
    try {
      let resp = this._apiSrv.getRepos(this.email).subscribe(res => {
        console.log(res);
        if (res['length'] < 1) {
          this.errorMsg = 'Não foram encontrados repositórios para o usuário informado';
          this._msgSrv.add({severity:'error', summary:'Erro buscar repositorios', detail:this.errorMsg});
          console.log(this.errorMsg);
          this.loaderSrv.hideLoader()
          return
        }
        this.urlProfile = res[0]['owner']['html_url'];
        this.urlPic = res[0]['owner']['avatar_url'];
        for (let k in res) {
          let repo = new Repo()
          repo.name = res[k].name;
          repo.url = res[k].html_url;
          repo.description = res[k].description;
          repo.data = res[k].updated_at;
          this.repos.push(repo);
        }
        this.loaderSrv.hideLoader();
      })
    } catch (err) {
      console.log(err);
    }
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
