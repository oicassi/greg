import { LoaderService } from './../../services/loader.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

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
export class GithubComponent implements OnInit {

  @Input() inputName: string;   // Input com as informações de usuário
  @Input() inputTitle: string;  // input com o título do componente

  userName: string;
  title: string;
  urlPic: string;
  urlProfile: string;
  errorMsg: string;
  repos: Repo[] = [];

  constructor(
    private _apiSrv: ApiService,
    private _msgSrv: MessageService,
    public loaderSrv: LoaderService) { 

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
    this.userName = this.inputName;
    this.title = this.inputTitle;
    this.fetchRepoData()
  }

  /**
   * Busca de dados dos repositórios na API do Github
   */
  async fetchRepoData() {
    try {
      let resp = this._apiSrv.getRepos(this.userName).subscribe(res => {
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
}
