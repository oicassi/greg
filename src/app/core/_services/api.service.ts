import { HttpError } from './../../shared/models/http-error';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AplicativoFreesound } from '@models/aplicativo';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UrlHandlingStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Infos para requests ao Github
  gitHubUrl = 'https://api.github.com';                   // URL base para as requisições à API do GitHub

  // Infos para requests ao Flickr
  flickrUrl = 'https://api.flickr.com/services/rest/';    // URL base para requisições à API do Flickr (por enquanto só estão sendo usadas requisições GET)
  flickrApiKey = 'e7e633e002953ef8985e906ba4475e33';      // AppKey fornecida pelo flickr no cadastro
  flickrFormat = 'json';                                  // Especifiação do formato de resposta
  flickrBuscaEmail = 'flickr.people.findByEmail';         // URL para buscar o NSID do usuário a partir de seu email
  flickrBuscaUsername = 'flickr.people.findByUsername';   // URL para buscar o NSID do usuário a partir de seu user name
  flickrProfile = 'flickr.people.getInfo';                // URL para buscar as informações do perfil do usuário (a partir de seu NSID)
  flickrFotosPublicas = 'flickr.people.getPublicPhotos';  // URL para buscar as fotos públicas de um usuário (a partir do seu NSID)
  // OBS: As requisições tem um parâmetro 'nojsoncallback' setado para 1 que é para evitar que o Flicker coloque a resposta num wrapper inútil

  // Infos para requests ao Freesound
  freesoundUrl = '/apiv2/';                                     // URL base para as requisições à API do Freesound (por enquanto só requisições GET)
  freesoundApiKey = '7hcXRSYLbFBBJ6nxwafrkPfp4XOmydctF4F5P2lH'; // Appkey fornecida pelo freesound no cadastro
  freesoundProfile = 'users/';                                  // URL para buscar as informações de perfil de um usuário
  freesoundAudios = 'users/' //<email>/sounds                // URL para buscar lista de músicas de um usuário. OBS: tem que completar a URL conforme o comentário
  freesoundBaseParams = 'name,previews,tags,description';

  constructor(private _http: HttpClient) {
  }


  /**
   * Busca os dados do freesound
   * @param user
   */
  getFreeSoundData(user: string): Observable<any> {

    user = user.trim();

    // Dados da request do perfil
    const urlProfile = `${this.freesoundUrl}${this.freesoundProfile}${user}`;
    let profileParams = new HttpParams();
    profileParams = profileParams.append('token', this.freesoundApiKey);

    const profileOptions = {params: profileParams};

    // Dados da request dos áudios
    const urlAudios = `${this.freesoundUrl}${this.freesoundAudios}${user}/sounds`;
    let audioParams = new HttpParams();
    audioParams = audioParams.append('token', this.freesoundApiKey)
    audioParams = audioParams.append('fields', this.freesoundBaseParams);

    const audioOptions = {params: audioParams};
    this._http.get(urlProfile, audioOptions)

    // Array de requisições
    const reqProfile = this._http.get(urlProfile, profileOptions)
    const reqAudio = this._http.get(urlAudios, audioOptions);

    // Execução das requisições em paralelo
    return forkJoin([reqProfile, reqAudio]);
  }

  /**
   * Buscar os dados de repositórios do GitHub
   * @param user Nome do usuário no GitHub
   */
  getGithubData(user: string): Observable<any> {
    user = user.trim();

    // Dados para request do perfil
    const urlProfile = `${this.gitHubUrl}/users/${user}`;

    // Dados para request dos repositórios
    const urlRepos = `${this.gitHubUrl}/users/${user}/repos`;

    // Array das requisições
    const reqProfile = this._http.get(urlProfile);
    const reqRepos = this._http.get(urlRepos);

    // Execução das requisições em paralelo
    return forkJoin([reqProfile, reqRepos]);
  }

  /**
   * Buscar os dados de fotos do Flickr
   * @param user Username do Flickr
   */
  getFlickrData(user: string): Observable<any> {
    user = user.trim();

    // Adiciona os parâmetros
    let params = new HttpParams();

    params = params.append('api_key', this.flickrApiKey);
    params = params.append('format', this.flickrFormat);
    params = params.append('nojsoncallback', '1');
    params = params.append('method', this.flickrBuscaUsername);
    params = params.append('username', user);

    const userOptions = {params};

    // Faz a chamada e a concatena com outras requisições necessárias para o flickr
    return this._http.get(this.flickrUrl, userOptions).pipe(
      switchMap(
        dadosBasicos => {
          if (dadosBasicos['stat'] === 'fail') {
            let error = new HttpError();
            error.message = 'Username não encontrado';
            error.status = 404;
            throw error;
          }
          return this.getFlickrAllData(dadosBasicos['user'].nsid).pipe(
          map(dados => dados),
        )
        })
    )
  }

  /**
   * Recupera informações de perfil e fotos com base em um nsid do usuário
   * @param nsid Identificador do usuário
   */
  getFlickrAllData(nsid: string) {

    // Dados para requisição de informações de perfil
    let profileParams = new HttpParams();
    profileParams = profileParams.append('api_key', this.flickrApiKey);
    profileParams = profileParams.append('format', this.flickrFormat);
    profileParams = profileParams.append('nojsoncallback', '1');
    profileParams = profileParams.append('method', this.flickrProfile);
    profileParams = profileParams.append('user_id', nsid);

    const profileOptions = {params: profileParams};


    // Dados para requisição de informações de fotos
    let photoParams = new HttpParams();
    photoParams = photoParams.append('api_key', this.flickrApiKey);
    photoParams = photoParams.append('format', this.flickrFormat);
    photoParams = photoParams.append('nojsoncallback', '1');
    photoParams = photoParams.append('method', this.flickrFotosPublicas);
    photoParams = photoParams.append('user_id', nsid);

    const photoOptions = {params: photoParams};

    // Monta e retorna o array das requisições
    const reqProfile = this._http.get(this.flickrUrl, profileOptions);
    const reqFotos = this._http.get(this.flickrUrl, photoOptions);

    return forkJoin([reqProfile, reqFotos]);
  }


  // Flickr deprecated ==================
  /**
   * Busca o NSID do usuário baseado no nome do usuário ou email
   * @param user email ou email do usuário
   */
  getFlickrNsid(user: string) {
    let userArray = user.split(';;');
    let userParams = new HttpParams();

    try {
      userParams = userParams.append('api_key', this.flickrApiKey);
      userParams = userParams.append('format', this.flickrFormat);
      userParams = userParams.append('nojsoncallback', '1');
      switch (userArray[0]) {
        case 'Email':
          userParams = userParams.append('method', this.flickrBuscaEmail);
          userParams = userParams.append('find_email', userArray[1]);
          break;
        case 'email':
          userParams = userParams.append('method', this.flickrBuscaUsername);
          userParams = userParams.append('email', userArray[1]);
          break;
        default:
          return {status: 'erro', detail: 'Ocorreu algo errado com o nome'};
      }
      const userOptions = {params: userParams};

      return this._http.get(this.flickrUrl, userOptions);
    } catch (err) {
      return err
    }
  }

  /**
   * Busca informações do perfil do usuário baseado no NSID
   * @param nsid identificador interno do usuário utilizado pelo Flickr
   */
  getFlickrProfile(nsid: string) {

    try {
      let profileParams = new HttpParams();
      profileParams = profileParams.append('api_key', this.flickrApiKey);
      profileParams = profileParams.append('format', this.flickrFormat);
      profileParams = profileParams.append('nojsoncallback', '1');
      profileParams = profileParams.append('method', this.flickrProfile);
      profileParams = profileParams.append('user_id', nsid);

      const profileOptions = {params: profileParams};

      return this._http.get(this.flickrUrl, profileOptions);

    } catch (err) {
      return err;
    }
  }

  /**
   * Método para busca das informações de fotos públicas de um usuário
   * @param nsid NSID do usuário do flickr
   */
  getFlickrPhotos(nsid: string) {

    try {
      let photoParams = new HttpParams();
      photoParams = photoParams.append('api_key', this.flickrApiKey);
      photoParams = photoParams.append('format', this.flickrFormat);
      photoParams = photoParams.append('nojsoncallback', '1');
      photoParams = photoParams.append('method', this.flickrFotosPublicas);
      photoParams = photoParams.append('user_id', nsid);

      const photoOptions = {params: photoParams};

      return this._http.get(this.flickrUrl, photoOptions);
    } catch (err) {
      return err;
    }
  }


  // =================


  // DEPRECATED ============================================================


  /**
   * Método para buscar informações do pefil no Freesound com base em um email
   * @param user nome do usuário para busca de perfil
   */
  getFreesoundProfile(user: string) {
    try {
      let url = `${this.freesoundUrl}${this.freesoundProfile}${user}`;
      let profileParams = new HttpParams();
      profileParams = profileParams.append('token', this.freesoundApiKey);

      const profileOptions = {params: profileParams};

      return this._http.get(url, profileOptions);

    } catch (err) {
      return err;
    }
  }

  /**
   * Método para buscar a lista de áudios de um determinado usuário
   * @param email nome do usuário que serão buscados os áudios
   */
  getFreesoundAudios(email: string) {
    try {
      let url = `${this.freesoundUrl}${this.freesoundAudios}${email}/sounds`;
      let audioParams = new HttpParams();
      audioParams = audioParams.append('token', this.freesoundApiKey)
      audioParams = audioParams.append('fields', this.freesoundBaseParams);

      const audioOptions = {params: audioParams};
      return this._http.get(url, audioOptions);

    } catch (err) {
      return err;
    }
  }

  /**
   * Método para buscar os repositórios de um usuário no Github
   * @param user Nome do usuáiro dono do repositório
   */
  getRepos(user: string) {
    user = user.trim();
    let endPoint: string = `/users/${user}/repos`;
    return this._http.get(this.gitHubUrl + endPoint)
  }
}
