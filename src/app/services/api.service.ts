import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
  flickrBuscaUserName = 'flickr.people.findByUsername';   // URL para buscar o NSID do usuário a partir de seu user name
  flickrProfile = 'flickr.people.getInfo';                // URL para buscar as informações do perfil do usuário (a partir de seu NSID)
  flickrFotosPublicas = 'flickr.people.getPublicPhotos';  // URL para buscar as fotos públicas de um usuário (a partir do seu NSID)
  // OBS: As requisições tem um parâmetro 'nojsoncallback' setado para 1 que é para evitar que o Flicker coloque a resposta num wrapper inútil

  constructor(private _http: HttpClient) { }

  /**
   * Método para buscar os repositórios de um usuário no Github
   * @param user Nome do usuáiro dono do repositório
   */
  getRepos(user: string) {
    user = user.trim();
    let endPoint: string = `/users/${user}/repos`;
    return this._http.get(this.gitHubUrl + endPoint)
  }

  /**
   * Busca o NSID do usuário baseado no nome do usuário ou email
   * @param user Username ou email do usuário
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
        case 'Username':
          userParams = userParams.append('method', this.flickrBuscaUserName);
          userParams = userParams.append('username', userArray[1]);
          break;
        default:
          return { status: 'erro', detail: 'Ocorreu algo errado com o nome' };
      }
      const userOptions = { params: userParams };

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

      const profileOptions = { params: profileParams };

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
      photoParams = photoParams.append('api_key', this.flickrApiKey)
      photoParams = photoParams.append('format', this.flickrFormat);
      photoParams = photoParams.append('nojsoncallback', '1');
      photoParams = photoParams.append('method', this.flickrFotosPublicas);
      photoParams = photoParams.append('user_id', nsid);

      const photoOptions = { params: photoParams };

      return this._http.get(this.flickrUrl, photoOptions);
    } catch (err) {
      return err;
    }
  }
}