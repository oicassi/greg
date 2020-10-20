import { AuthenticationService } from 'src/app/core/_services';
import { Usuario } from 'src/app/core/_models';
import { TokenService } from './../../core/_services/token.service';
import { LoaderService } from './../../core/_services/loader.service';
import { Card } from './../../models/card.model';
import { environment } from './../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from 'src/app/core/_services/pages.service';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module/lib/tag-cloud.interfaces';


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
    private authenticationService: AuthenticationService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.queryParams.subscribe(params => {
      if (params && params['q']) {
        this.searchParam = params['q'];
        if (this.searchParam && this.searchParam !== '') {
          this._loaderSrv.showLoader();
          this.classe = true;
          this.showContainer = false;
          this.showResultado = true;
        } else {
          this.router.navigate(['/']);
        }
      }
    });
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
    this._pagesSrv.getAllTags().subscribe((tags) => this.setTagCloud(tags));
    if (this.showResultado) {
      this.mostrarResultadoBusca(this.searchParam);
    }
  }

  previewSearch(term: string): void {
    let terms = term.split(' ');
    this.tagCloud = [];
    if (!term || term === '') {
      this.tagCloud = Array.from(this.tagCloudRaw);
      return;
    }
    for (let tag of this.tagCloudRaw) {
      let found = false;
      terms.forEach((term) => {
        if (found) {
          return;
        }
        if (tag.text.toLowerCase().includes(term.toLowerCase())) {
          this.tagCloud.push(tag);
          found = true;
        }
      })
    }
  }



  get hasToken() {
    return this.tokenService.hasToken();
  }

  irParaBusca(term: string): void {
    if (!term) {
      return;
    }
    if (this.classe) {
      this.router.navigate(['/search'], { queryParams: { q: term } });
      return;
    }
    this.classe = true;
    setTimeout(() => {
      this.showContainer = false;
      this.router.navigate(['/search'], { queryParams: { q: term } });
    }, 500)
  }

  mostrarResultadoBusca(term: string): void {
    this._pagesSrv.searchCards(term).subscribe((cards) => {
      this.dadosBusca = cards;
      this._loaderSrv.hideLoader();
    })
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

}
