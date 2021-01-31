import { PagesService } from '@services/pages.service';
import { UserPageGlobal } from '@models/user';
import { AuthenticationService } from 'src/app/core/_services';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import {
  AplicativoBase,
  AplicativoFlickr,
  AplicativoFoto,
  AplicativoFreesound,
  AplicativoGithub,
  AplicativoTags,
  AplicativoTexto,
  AplicativoBio,
  AplicativoApi
} from '@models/aplicativo';
import { Foto, Audio, Repo, Texto } from '@models/aplicativo-item';
import { AplicativosModels } from '@shared/constants/aplicativos';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ComponenteBackBase, ConversorBackEnd } from '@helpers/conversorBackEnd';
import { FileGregs } from '@models/file-greg';
import { GenericResponse } from '@models/responses/generic-response';
import { UserConfigs } from '@models/user-configs';
import { Pagina } from '@models/pagina';

@Injectable({
  providedIn: 'root'
})
export class AplicativoService {

  aplicativos: AplicativoBase[] = [];
  baseURL = 'http://localhost:8080'
  constructor(
    private _apiSrv: ApiService,
    private _http: HttpClient,
    private _userSrv: UserService,
    private _authSrv: AuthenticationService,
    private _pagesSrv: PagesService
  ) {
    this.aplicativos = [];
    // this.aplicativos.push(this.getMockBio());
    // this.aplicativos.push(this.getMockFlickr());
    // this.aplicativos.push(this.getMockFotos());
    // this.aplicativos.push(this.getMockFreesound());
    // this.aplicativos.push(this.getMockGithub());
    // this.aplicativos.push(this.getMockTags());
    // this.aplicativos.push(this.getMockTexto());
    ConversorBackEnd
  }

  /**
   * Retorna a lista de aplicativos adicionados à página
   */
  getAplicativos(): AplicativoBase[] {
    return this.aplicativos;
  }

  /**
   * Retorna um aplicativo a partir da sua ordem
   * @param order Ordem do aplicativo
   */
  getAplicativoByOrder(order: number): AplicativoBase {
    let app = this.aplicativos.find((app) => app.order === order);
    return app;
  }

  /**
   * Seta uma lista de aplicativos
   * @param aplicativos Lista de aplicativos
   */
  setAplicativos(aplicativos: AplicativoBase[]): void {
    this.aplicativos = aplicativos;
  }

  /**
   * Adiciona um aplicativo à lista de aplicativos
   * @param aplicativo Aplicativo para ser adicionado
   */
  addAplicativo(aplicativo: AplicativoBase): void {
    // Pegar o order do último aplicativo
    let apps = this.aplicativos.sort((a, b) => a.order - b.order);
    if (apps && apps.length) {
      aplicativo.order = apps[apps.length - 1].order + 1;
    } else {
      aplicativo.order = 0;
    }

    // Adicionar o aplicativo
    this.aplicativos.push(aplicativo);
  }

  /**
   * Remove um aplicativo da lista com base no order
   * @param aplicativo Aplicativo para ser removido
   */
  removeAplicativo(order: number): void {
    let i = this.aplicativos.findIndex((app) => app.order === order);
    if (i >= 0) {
      this.aplicativos.splice(i, 1);
    }

    // Shift na ordem dos aplicativos
    this.aplicativos.forEach((app) => {
      if (app.order > order) {
        app.order -= 1;
      }
    })
  }

  /**
   * Substitui um aplicativo da lista
   * @param app Aplicativo novo que irá substituir
   */
  replaceAplicativo(app: AplicativoBase): void {
    let i = this.aplicativos.findIndex((aplicativo) => aplicativo.order === app.order);
    if (i >= 0) {
      this.aplicativos.splice(i, 1, app);
    } else {
      this.addAplicativo(app);
    }
  }

  carregarAplicativos(urlUser: string) {
    if (!urlUser) {
      throw new Error('Nenhuma URL informada');
    }

    return this._http.get(`${this.baseURL}/pagina/${urlUser}`).pipe(
      mergeMap((respostaPagina: GenericResponse<any>) => {
        if (!respostaPagina || !respostaPagina.data) {
          throw new Error('Não foi encontrada a página');
        }
        console.log('GET PAGE');
        console.log(respostaPagina)
        if (!respostaPagina || !respostaPagina.data || !respostaPagina.data.pagina) {
          throw new Error('Ocorreu um erro ao buscar dados gerais da página');
        }
        let dados = new UserPageGlobal();
        dados.pageBgColor = respostaPagina.data.pagina.backgroundColor || '#CACACA';
        this._pagesSrv.setPageGlobalInfo(dados);

        if (!respostaPagina.data.pagina.componentes || !respostaPagina.data.pagina.componentes.length) {
          console.log('Entao nao achou nada nos componentes')
          return of([])
        }
        const { componentes } = respostaPagina.data.pagina;
        console.log('COMPONENTES');
        console.log(componentes);
        let requisicoes = componentes.map(comp => {
          return this._http.get(`${this.baseURL}/componente/${comp.id}`)
        })
        console.log('REQUISICOES');
        console.log(requisicoes)
        return forkJoin(requisicoes).pipe(
          map(dados => ConversorBackEnd.montarDadosAplicativos(dados)),
        )
      }), catchError(err => {
        console.log('Erro no catchError');
        console.log(err);
        throw err;
      })
    )


  }

  /**
   * Salva novos componentes ou altera os existentes
   */
  async salvarAplicativos(): Promise<void | any> {
    if (!this.aplicativos || !this.aplicativos.length) {
      console.log('Sem dados para salvar');
      return;
    }

    let componentesParaSalvar: Array<ComponenteBackBase> = [];
    let componentesParaLinkar = {
      id: null,
      url: null,
      backgroundColor: this._pagesSrv.getPageGlobalInfo().pageBgColor || '#CACACA',
      componentes: []
    }

    componentesParaSalvar = this.aplicativos.map((app) => {
      let comp = ConversorBackEnd.montarPayload(app);
      return comp;
    })

    console.log('Salvando componentes');
    console.log(componentesParaSalvar);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const urlSalvar = `${this.baseURL}/componente/`;

    // Coloca as requests no array de promises
    let promises = []

    componentesParaSalvar.forEach((comp) => {
      promises.push(this._http.post(urlSalvar, comp, {
        headers
      }).toPromise())
    })

    const responseSalvar =  await Promise.all(promises);
    
    if (!responseSalvar) {
      throw new Error('Ocorreu um erro ao salvar os componentes');
    }

    console.log('[AppService] Acho que salvou de boas');
    console.log(responseSalvar);

    this.atribuirIdsAposSalvar(responseSalvar);

    // Montar a resquest para fazer o link dos componentes
    componentesParaLinkar.componentes = this.aplicativos.map(app => {
      return ({
        id: app.id,
        tipo: null
      })
    });
    
    console.log('Componentes para linkar');
    console.log(componentesParaLinkar);

    const urlLinkar = `${this.baseURL}/pagina`;
    return await this._http.put(urlLinkar, componentesParaLinkar, {
      headers
    }).toPromise();
  }

  /**
   * Retorna a lista dos aplicativos possíveis de serem selecioinados
   */
  getTiposAplicativos(): Array<{ type: string, label: string }> {
    return AplicativosModels.SELECIONAVEIS;
  }

  /**
   * Retorna a lista de todos os aplicativos disponíveis
   */
  getTodosTiposAplicativos(): Array<{ type: string, label: string }> {
    return AplicativosModels.TODOS;
  }

  /**
   * Realiza uma request para buscar os dados do Freesound
   * @param appFreesound Dados do Freesound que serão atualizados
   */
  requestFreesoundData(appFreesound: AplicativoFreesound): Observable<AplicativoFreesound> {
    if (!appFreesound || !appFreesound.username || appFreesound.username === '') {
      return of(appFreesound);
    }
    return this._apiSrv.getFreeSoundData(appFreesound.username).pipe(
      map(([profile, audios]) => this.handleFreesoundData(profile, audios)),
      map((appGerado) => {
        appFreesound.audio_array = appGerado.audio_array;
        appFreesound.description = appGerado.description;
        appFreesound.profile_url = appGerado.profile_url;
        return appFreesound;
      })
    )
  }

  /**
   * Trata as informações gerais vindas das requests ao freesound;
   * @param profile Informações sobre o perfil
   * @param audios Informações sobre os áudios
   */
  handleFreesoundData(profile: any, audios: any): AplicativoFreesound {

    console.log('%cFREESOUND AUDIOS', 'color:blue');
    console.log(audios);

    let freeSound = new AplicativoFreesound();
    freeSound.audio_array = this.handleFreesoundAudios(audios);
    freeSound.description = profile.about || 'Descrição não informada';
    freeSound.profile_url = profile.url;

    return freeSound;
  }

  /**
   * Trata as informações de áudios vindas do freesound e monta um array
   * @param audios Dados de áudios vindos da requisição
   */
  handleFreesoundAudios(audios: any): Audio[] {
    let audioArray: Audio[] = [];
    const { results } = audios;
    results.forEach((res, i) => {
      // Temporário, para limitar a quantidade de áudios
      if (i > 50) {
        return
      }
      let novoAudio = new Audio();
      novoAudio.name = res.name;
      novoAudio.description = res.description;

      // Pegar a url do mp3 de alta qualidade
      for (let key in res.previews) {
        if (key.includes('hq-mp3')) {
          novoAudio.url = res.previews[key];
          break;
        }
      }
      novoAudio.tags = Array.from(res.tags);
      audioArray.push(novoAudio);
    })
    return audioArray;
  }

  /**
   * Realiza uma request para buscar os dados do Github
   * @param appGithub Dados do Github que serão atualiados
   */
  requestGithubData(appGithub: AplicativoGithub): Observable<AplicativoGithub> {
    if (!appGithub || !appGithub.username || appGithub.username === '') {
      return of(appGithub);
    }
    return this._apiSrv.getGithubData(appGithub.username).pipe(
      map(([profile, repos]) => this.handleGitHubData(profile, repos)),
      map((appGerado) => {
        appGithub.repo_array = appGerado.repo_array;
        appGithub.description = appGerado.description;
        appGithub.profile_url = appGerado.profile_url;
        return appGithub;
      })
    )
  }

  /**
   * Trata as informações gerais vindas das requests ao github;
   * @param profile Informações sobre o perfil
   * @param audios Informações sobre os repositórios
   */
  handleGitHubData(profile: any, repos: any): AplicativoGithub {
    if (profile && profile.message && profile.message === 'Not Found') {
      throw new Error('Usuário do Github não encontrado');
    }

    console.log('%cGITHUB REPOOS', 'color: red');
    console.log(repos);

    let novoGithub = new AplicativoGithub();
    if (!profile) {
      return novoGithub;
    }

    // Monta o objeto com os dados pertinentes da requisição
    novoGithub.repo_array = this.handleGitHubRepos(repos);
    novoGithub.description = profile.bio;
    novoGithub.profile_url = profile.html_url;

    return novoGithub;
  }

  /**
   * Trata os dados dos repositórios do GitHub
   * @param repos Dados da request com os repositórios
   */
  handleGitHubRepos(repos: any): Repo[] {
    if (!repos || !repos.length) {
      return [];
    }

    // Ordena do mais recente atualizado para o mais antigo
    repos.sort((a, b) => new Date(b.updated_at).valueOf() - new Date(a.updated_at).valueOf());


    // Mapeia os dados para o vetor de repositórios
    let novosRepos: Repo[] = repos.map((repo) => {
      return (
        {
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          data: new Date(repo.updated_at).toLocaleDateString()
        }
      )
    })

    return novosRepos;
  }

  /**
   * Realiza uma request para buscar os dados do Flickr
   * @param appFlickr Dados do Flickr que serão atualizado
   */
  requestFlickrData(appFlickr: AplicativoFlickr): Observable<AplicativoFlickr> {
    if (!appFlickr || !appFlickr.username || appFlickr.username === '') {
      return of(appFlickr);
    }
    return this._apiSrv.getFlickrData(appFlickr.username).pipe(
      map(([profile, fotos]) => this.handleFlickrData(profile, fotos)),
      map((appGerado) => {
        appFlickr.photo_array = appGerado.photo_array;
        appFlickr.description = appGerado.description;
        appFlickr.profile_url = appGerado.profile_url;
        appFlickr.full_name = appGerado.full_name;
        appFlickr.alias = appGerado.alias;
        return appFlickr
      })
    )
  }

  /**
   * Trata as informações gerais vindas das requests ao flickr
   * @param profile Informações sobre o perfil
   * @param fotos Informações sobre as fotos
   */
  handleFlickrData(profile: any, fotos: any): AplicativoFlickr {
    if (profile && profile.stat === 'fail') {
      throw new Error('Erro ao buscar informações do perfil');
    }
    if (fotos && fotos.stat === 'fail') {
      throw new Error('Erro ao buscar fotos do perfil');
    }

    console.log('%cFLICKR FOTOS', 'color: green');
    console.log(fotos);

    let novoFlickr = new AplicativoFlickr();

    // Monta o objeto com os dados pertinentes da requisição
    novoFlickr.photo_array = this.handleFlickrFotos(fotos);
    novoFlickr.description = profile.person.description._content;
    novoFlickr.profile_url = profile.person.profileurl._content;
    novoFlickr.full_name = profile.person.realname._content;
    novoFlickr.alias = profile.person.path_alias;

    return novoFlickr;
  }

  /**
   * Trata os dados dos das fotos do Flickr
   * @param repos Dados da request com as fotos
   */
  handleFlickrFotos(fotos: any): Foto[] {
    if (!fotos.photos || !fotos.photos.photo || !fotos.photos.photo.length) {
      return [];
    }

    let novasFotos: Foto[] = [];
    fotos.photos.photo.forEach((foto) => {
      const { farm, server, id, secret, title } = foto;
      let novaFoto = new Foto();
      novaFoto.name = title;
      novaFoto.url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
      novasFotos.push(novaFoto);
    })

    return novasFotos;
  }


  private getMockBio(): AplicativoBio {
    let dado = new AplicativoBio();
    dado.component_name = 'Bio';
    dado.bgColor = '#bebebe';
    dado.fgColor = '#444444';
    dado.imagem = null;
    dado.order = -1;
    dado.type = 'bio';
    dado.texto = new Texto();
    dado.texto.title = 'Título qualquer';
    dado.texto.id = null;
    dado.texto.body = "Surveillance audio recorder in a dried-up creek And we're headed to the temporary shelter at the roller rink Every woman and child and man in the canyon land In a trance and wandering around in the canyon land Airplane station is a pretty great place to hide Live old-time music and it's warm inside Every woman and child and man in the canyon land In a trance and wandering around in the canyon land Antique photos of celebrities Samsung black-and-white fade-away qualities Every woman and child and man in the canyon land In a trance and wandering about in the canyon land Surveillance video recorder hidden in a tree You and I are on the lawn and it's focusing in on me Every woman and child and man In a trance and wandering around in the canyon land Everything about us is a lost machine Everything about us is a lost machine Everything about we is a forgotten dream Everything about us is a lost machine Everything about us is a lost machine Everything about us is a lost machine Everything about we is a forgotten dream Everything about us is a lost machine Everything about us is a lost machine Everything about us is a lost machine Everything about we is a final dream Everything about us is a lost machine Surveillance audio recorder in a dried-up creek And we're headed to the temporary shelter at the roller rink Every woman and child and man in the canyon land In a trance and wandering around in the canyon land Airplane station is a pretty great place to hide Live old-time music and it's warm inside Every woman and child and man in the canyon land In a trance and wandering around in the canyon land Antique photos of celebrities Samsung black-and-white fade-away qualities Every woman and child and man in the canyon land In a trance and wandering about in the canyon land Surveillance video recorder hidden in a tree You and I are on the lawn and it's focusing in on me Every woman and child and man In a trance and wandering around in the canyon land Everything about us is a lost machine Everything about us is a lost machine Everything about we is a forgotten dream Everything about us is a lost machine Everything about us is a lost machine Everything about us is a lost machine Everything about we is a forgotten dream Everything about us is a lost machine Everything about us is a lost machine Everything about us is a lost machine Everything about we is a final dream Everything about us is a lost machine";
    return dado;
  }

  private getMockFlickr(): AplicativoFlickr {
    let dado = new AplicativoFlickr();
    dado.component_name = 'Fotos do flickr nome gigante tralalalalalalalalalal anskfdasdfa asdfasf';
    dado.order = 2;
    dado.type = 'flickr';
    dado.fgColor = '#444444';
    dado.bgColor = '#b894f6';

    dado.username = 'Cassiano Kruchelski';
    dado.description = '';
    dado.profile_url = '';

    dado.full_name = '';
    dado.alias = '';
    dado.photo_array = [];

    return dado;
  }

  private getMockFotos(): AplicativoFoto {
    let dado = new AplicativoFoto()
    dado.component_name = 'Fotos simples';
    dado.order = 4;
    dado.type = 'fotos';
    dado.fgColor = '#444444';
    dado.bgColor = '#fefb99';
    dado.imagem = null;
    return dado;
  }

  private getMockFreesound(): AplicativoFreesound {
    let dado = new AplicativoFreesound();

    dado.component_name = 'Freesoundzera';
    dado.order = 1;
    dado.type = 'freesound';
    dado.fgColor = '#AA4477';
    dado.bgColor = '#94a1f6';

    dado.username = 'casstway';
    dado.description = '';
    dado.profile_url = '';

    dado.audio_array = [];

    return dado;
  }

  private getMockGithub(): AplicativoGithub {
    let dado = new AplicativoGithub();

    dado.component_name = 'Githubnei';
    dado.order = 0;
    dado.type = 'github';
    dado.fgColor = '#444444';
    dado.bgColor = '#e994f6';

    dado.username = 'kruchelski';
    dado.description = '';
    dado.profile_url = '';

    dado.repo_array = [];

    return dado;
  }

  private getMockTags(): AplicativoTags {
    let dado = new AplicativoTags();

    dado.component_name = 'Tagues';
    dado.order = 3;
    dado.type = 'tags';
    dado.fgColor = '#444444';
    dado.bgColor = '#E57373';

    dado.tag_array = ['teste', 'vai-tomar-no-cu', 'socorro', 'cansera'];

    return dado;
  }

  private getMockTexto(): AplicativoTexto {
    let dado = new AplicativoTexto();

    dado.component_name = 'Textinhos';
    dado.order = 5;
    dado.type = 'texto';
    dado.fgColor = '#444444';
    dado.bgColor = '#80CBC4';
    dado.showAppTitle = false;

    dado.texto_array = [];

    let texto1 = new Texto();
    texto1.title = 'Título do tesakfjhasfas f asf as fdasfd as fd asfd as dfa sfd as dfas fa  wef as f as fd as df as f xto 1';
    texto1.body = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?";
    dado.texto_array.push(texto1);

    let texto2 = new Texto();
    texto2.title = 'Título do texto 2';
    texto2.body = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";
    dado.texto_array.push(texto2);

    return dado;
  }

  /**
   * Atribui os IDs vindos da resposta após salvar os componentes
   * @param response Resposta dos componentes salvos
   */
  atribuirIdsAposSalvar(response: any[]): void {
    console.log('Atribuir tudo');
    console.log(response);
    for (let i = 0; i < this.aplicativos.length; i++) {
      ConversorBackEnd.atribuirId(response[i].data, this.aplicativos[i]);
    }
  }

}
