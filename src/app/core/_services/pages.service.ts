import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserPageGlobal, Usuario} from '@models/user';
import {environment} from 'src/environments/environment';
import {GenericResponse} from "@models/responses/generic-response";

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  dadosUserPage: UserPageGlobal;
  visualizarPreview = false;
  carregarDados = true;

  constructor(private _http: HttpClient) {
    if (!this.dadosUserPage || !this.dadosUserPage.pageBgColor) {
      this.dadosUserPage = this.getMockPageGlobal();
    }
  }

  getAllTags() {
    return this._http.get<GenericResponse<Usuario[]>>(`${environment.apiUrl}/usuarios`);
  }

  searchCards(terms: string) {
    console.log(terms);

    if (terms == '' || terms == null) {
      return this.getAllTags();
    } else {
      return this._http.get<GenericResponse<Usuario[]>>(`${environment.apiUrl}/usuarios?busca=${terms}&limite=10`);
    }
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
