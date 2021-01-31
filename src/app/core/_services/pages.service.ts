import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserPageGlobal} from '@models/user';
import {Card} from 'src/app/shared/models/card.model';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  dadosUserPage: UserPageGlobal;
  visualizarPreview = false;

  constructor(private _http: HttpClient) {
    if (!this.dadosUserPage || !this.dadosUserPage.pageBgColor) {
      this.dadosUserPage = this.getMockPageGlobal();
    }
  }

  getAllTags() {
    return this._http.get<string[]>(`${environment.tagApiUrl}/alltags`);
  }

  searchCards(terms: string) {
    let searchTerms = terms.split(' ');
    return this._http.post<Card[]>(`${environment.tagApiUrl}/searchTags`, searchTerms);
  }

  /**
   * Recupera as informações globais da página do usuário
   */
  getPageGlobalInfo(): UserPageGlobal {
    return this.dadosUserPage;
  }

  /**
   * Setar os dados globais da página
   * @param dados Dados que serão setados
   */
  setPageGlobalInfo(dados: UserPageGlobal): void {
    this.dadosUserPage = dados;
  }

  /**
   * Dados globais da página mockados
   */
  getMockPageGlobal(): UserPageGlobal {
    let page = new UserPageGlobal();
    page.pageBgColor = '#ababab';
    return page;
  }


}
