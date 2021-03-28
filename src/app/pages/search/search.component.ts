import { GenericResponse } from './../../shared/models/responses/generic-response';
import { TagService } from './../../core/_services/tags.service';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module/lib/tag-cloud.interfaces';
import { AuthenticationService } from 'src/app/core/_services';
import { PagesService } from 'src/app/core/_services/pages.service';
import { Usuario } from 'src/app/shared/models';
import { environment } from './../../../environments/environment';
import { LoaderService } from './../../core/_services/loader.service';
import { TokenService } from './../../core/_services/token.service';
import { Card } from '../../shared/models/card.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  titulo = environment.titulo;
  slogan = environment.slogan;
  showContainer = true;
  showResultado = false;
  dadosBusca: Card[] = [];
  classe = false;
  searchParam: string;
  tagCloudRaw: CloudData[] = [];
  tagCloud: CloudData[] = [];
  tagCloudOptions: CloudOptions = {};
  currentUser: Usuario;



  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private _pagesSrv: PagesService,
    public _loaderSrv: LoaderService,
    private tokenService: TokenService,
    private authenticationService: AuthenticationService,
    private tagService: TagService
  ) {
  }


  ngOnInit() {
    this.buscaUsuario();
  }



  buscaUsuario() {
    this.authenticationService.currentUser.subscribe(user => {
      if (user) this.currentUser = user
      this.buscarTags();
    });
  }

  buscarTags() {
    this.tagService.getAll().subscribe((tags: GenericResponse<string[]>) => this.setTagCloud(tags.data))
    // this.mostrarResultadoBusca(this.searchParam);
  }

  previewSearch(term: string): void {
    this.tagCloud = [];
    if (!term || term === '') {
      this.tagCloud = Array.from(this.tagCloudRaw);
      return;
    }
    term = term.trim();
    for (let tag of this.tagCloudRaw) {
      if (tag.text.toLowerCase().includes(term.toLowerCase())) {
        this.tagCloud.push(tag);
      }
    }
  }



  get hasToken() {
    return this.tokenService.hasToken();
  }

  irParaBusca(term: string): void {
    if (term == '' || term == null) {
      return;
    }
    this.showContainer = false;
    this.showResultado = true;
    this.mostrarResultadoBusca(term);
  }

  mostrarResultadoBusca(term: string): void {
    this._loaderSrv.showLoader();

    this._pagesSrv.searchCards(term).subscribe(
      (resultado) => {
        let resultadoArr: Usuario[] = resultado.data;

        // ordenar colocando primeiro os usuarios cujas tags fazem sentido com a busca
        // Essa é a coisa mais horrorosa que existe aqui

        let tagMatch: Usuario[] = [];
        let tagUnmatch: Usuario[] = [];

        resultadoArr.forEach(user => {
          let found = false;
          for (const tag of user.tags) {
            if (tag.includes(term.toUpperCase())) {
              tagMatch.push(user);
              found = true;
              break;
            }
          }
          if (!found) {
            tagUnmatch.push(user);
          }
        })

        // remover possíveis duplicados;
        let tagMatchAux: Usuario[] = []
        let tagUnmatchAux: Usuario[] = [];

        tagMatch.forEach(user => {
          let i = tagMatchAux.findIndex(u => u.id === user.id);
          if (i < 0) {
            tagMatchAux.push(user);
          }
        })

        tagUnmatch.forEach(user => {
          let i = tagUnmatchAux.findIndex(u => u.id === user.id);
          if (i < 0) {
            tagUnmatchAux.push(user);
          }
        })

        tagMatchAux.sort((a, b) => {
          if (`${a.pessoa.nome}${a.pessoa.sobrenome}` < `${b.pessoa.nome}${b.pessoa.sobrenome}`) { return -1; }
          if (`${a.pessoa.nome}${a.pessoa.sobrenome}` > `${b.pessoa.nome}${b.pessoa.sobrenome}`) { return 1; }
          return 0;
        })

        tagUnmatchAux.sort((a, b) => {
          if (`${a.pessoa.nome}${a.pessoa.sobrenome}` < `${b.pessoa.nome}${b.pessoa.sobrenome}`) { return -1; }
          if (`${a.pessoa.nome}${a.pessoa.sobrenome}` > `${b.pessoa.nome}${b.pessoa.sobrenome}`) { return 1; }
          return 0;
        })

        resultadoArr = [];
        resultadoArr = tagMatchAux.concat(tagUnmatchAux);

        this.dadosBusca = [];

        resultadoArr.forEach(usuario => {
          this.dadosBusca.push(new Card(`${usuario.pessoa.nome} ${usuario.pessoa.sobrenome}`, usuario.tags, this.getImagemUsuario(usuario), usuario.pagina.url));
        });

        this._loaderSrv.hideLoader();
      },
      (err) => {
        console.log('Ocorreu erro ao buscar tags');
        console.log(err);
        this.dadosBusca = [];
        this._loaderSrv.hideLoader();
      }
    )
  }

  getImagemUsuario(usuario: Usuario) {
    let strImagemPadrao = 'https://www.w3schools.com/howto/img_avatar.png';
    let strImagem = 'data:image/jpeg;base64,'

    return usuario.imagemUsuario.base64Img ? (strImagem + usuario.imagemUsuario.base64Img) : strImagemPadrao;
  }

  setTagCloud(tags: string[]): void {
    this.tagCloudOptions = {
      width: 800,
      height: 300,
      overflow: false
    }
    let tagCloud = {};

    tags.forEach((tag) => {
      if (!tagCloud[tag]) {
        tagCloud[tag] = 0;
      }
      tagCloud[tag] += 1;
    })
    this.tagCloud = [];
    this.tagCloudRaw = [];
    for (let tag in tagCloud) {
      this.tagCloudRaw.push({
        text: tag,
        weight: tagCloud[tag]
      })
    }
    this.tagCloud = Array.from(this.tagCloudRaw);
  }

  resetScreen() {

    this.showContainer = true;
    this.showResultado = false
    this.searchParam = '';

    this.buscarTags();
  }
}
