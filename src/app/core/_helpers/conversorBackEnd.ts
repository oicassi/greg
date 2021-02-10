import { AplicativoFreesound, AplicativoGithub } from './../../shared/models/aplicativo';
import { Texto } from '@models/aplicativo-item';
import { AplicativoBase, AplicativoTexto, AplicativoBio, AplicativoFoto, AplicativoFlickr } from '@models/aplicativo';
import { FileGregs } from '@models/file-greg';
export class ConversorBackEnd {

  /**
   * Constrói um payload para salvar um componente conforme especificações do servidor
   * @param app Aplicativo que está sendo salvo
   */
  static montarPayload(app: AplicativoBase, i:number): ComponenteBackBase {
    if (!app) {
      return null;
    }
    switch (app.type) {
      case 'texto':
        return this.montarTextoPayload(app as AplicativoTexto, i);
      case 'bio':
        return this.montarBioPayload(app as AplicativoBio, i);
      case 'fotos':
        return this.montarFotoPayload(app as AplicativoFoto, i);
      case 'flickr':
        if ((app as AplicativoFlickr).username) {
          return this.montarFlickrPayload(app as AplicativoFlickr, i);
        }
      case 'freesound':
        if ((app as AplicativoFreesound).username) {
          return this.montarFreesoundPayload(app as AplicativoFreesound, i);
        }
      case 'github':
        if ((app as AplicativoGithub).username) {
          return this.montarGithubPayload(app as AplicativoGithub, i);
        }
    }
  }

  /**
   * Constrói o payload para salvar um componente do tipo texto
   * @param app AplicativoTexto base
   */
  static montarTextoPayload(app: AplicativoTexto, i: number): ComponenteTexto {
    let componente = new ComponenteTexto();
    componente.id = null;
    componente.titulo = app.component_name;
    componente.ordem = app.order !== null && app.order !== undefined ? app.order : i;
    componente.mostrarTitulo = app.showAppTitle;
    componente.backgroundColor = app.bgColor;
    componente.foregroundColor = app.fgColor;
    componente.textos = app.texto_array.map((texto) => {
      let novoTexto = new TextoBack();
      novoTexto.titulo = texto.title;
      novoTexto.descricao = texto.body
      novoTexto.id = null;
      return novoTexto;
    })

    return componente;
  }

  /**
   * Constrói o payload para salvar um componente do tipo bio
   * @param app AplicativoBio base
   */
  static montarBioPayload(app: AplicativoBio, i: number): ComponenteBio {
    let componente = new ComponenteBio();
    componente.id = null;
    componente.titulo = app.component_name;
    componente.ordem = app.order !== null && app.order !== undefined ? app.order : i;
    componente.mostrarTitulo = app.showAppTitle;
    componente.backgroundColor = app.bgColor;
    componente.foregroundColor = app.fgColor;
    componente.texto = new TextoBack();
    componente.texto.titulo = app.texto.title;
    componente.texto.id = null;
    componente.texto.descricao = app.texto.body;
    componente.imagem = app.imagem ? Object.assign({}, app.imagem) : null;
    if (componente.imagem) {
      componente.imagem.id = null;
      if (componente.imagem.base64Img) {
        componente.imagem.base64Img = componente.imagem.base64Img.replace(/^data:image\/[a-z]+;base64,/, "");
      }
    }
    
    return componente;
  }
  
  /**
   * Constrói o payload para salvar um componente do tipo foto
   * @param app AplicativoFoto base
   */
  static montarFotoPayload(app: AplicativoFoto, i: number): ComponenteFoto {
    let componente = new ComponenteFoto();
    componente.id = null;
    componente.titulo = app.component_name;
    componente.ordem = app.order !== null && app.order !== undefined ? app.order : i;
    componente.mostrarTitulo = app.showAppTitle;
    componente.backgroundColor = app.bgColor;
    componente.foregroundColor = app.fgColor;
    componente.imagem = app.imagem ? Object.assign({}, app.imagem) : null;
    if (componente.imagem) {
      componente.imagem.id = null;
      if (componente.imagem.base64Img) {
        componente.imagem.base64Img = componente.imagem.base64Img.replace(/^data:image\/[a-z]+;base64,/, "");
      }
    }
    
    return componente;
  }

  /**
   * Constrói o payload para salvar um componente do tipo Flickr
   * @param app  AplicativoFlickr base
   */
  static montarFlickrPayload(app: AplicativoFlickr, i: number): ComponenteFlickr {
    let componente = new ComponenteFlickr();
    componente.id = null;
    componente.username = app.username;
    componente.titulo = app.component_name;
    componente.ordem = app.order !== null && app.order !== undefined ? app.order : i;
    componente.mostrarTitulo = app.showAppTitle;
    componente.backgroundColor = app.bgColor;
    componente.foregroundColor = app.fgColor;
    componente.imagensFlickr = app.imagensFlickr.map(img => {
      return {id: null, secretId: img.secretId}
    })

    return componente;
  }

  /**
   * Constrói o payload para salvar um componente do tipo Github
   * @param app AplicativoGithub base
   */
  static montarGithubPayload(app: AplicativoGithub, i: number): ComponenteGithub {
    let componente = new ComponenteGithub();
    componente.id = null;
    componente.username = app.username;
    componente.titulo = app.component_name;
    componente.ordem = app.order !== null && app.order !== undefined ? app.order : i;
    componente.mostrarTitulo = app.showAppTitle;
    componente.backgroundColor = app.bgColor;
    componente.foregroundColor = app.fgColor;
    componente.repos = app.repos.map(repo => {
      return {id: null, secretId: repo.secretId}
    })

    return componente;
  }

  /**
   * Constrói o payload para salvar um componente do tipo Freesound
   * @param app 
   */
  static montarFreesoundPayload(app: AplicativoFreesound, i: number): ComponenteFreesound {
    let componente = new ComponenteFreesound();
    componente.id = null;
    componente.username = app.username;
    componente.titulo = app.component_name;
    componente.ordem = app.order !== null && app.order !== undefined ? app.order : i;
    componente.mostrarTitulo = app.showAppTitle;
    componente.backgroundColor = app.bgColor;
    componente.foregroundColor = app.fgColor;
    componente.audios = app.audios.map(audio => {
      return {id: null, secretId: audio.secretId}
    })

    return componente;
  }

  /**
   * Seletor de tipo de componente para fazer atribuição de id e id dos objetos internos
   * @param response Resposta do server
   * @param app Aplicativo que será feita atribuição dos ids
   */
  static atribuirId(response: any, app: AplicativoBase): void {
    if (!response || !app) {
      return;
    }

    switch(app.type) {
      case 'bio':
        return this.atribuirIdComponenteBio(response, app as AplicativoBio);
      case 'texto':
        return this.atribuirIdComponenteTexto(response, app as AplicativoTexto);
      case 'fotos':
        return this.atribuirIdComponenteFoto(response, app as AplicativoFoto);
      case 'flickr':
        return this.atribuirIdComponenteFlickr(response, app as AplicativoFlickr);
      case 'freesound':
        return this.atribuirIdComponenteFreesound(response, app as AplicativoFreesound);
      case 'github':
        return this.atribuirIdComponenteGithub(response, app as AplicativoGithub);
    }
  }

  /**
   * Atribui os ids retornados do backend para um componente do tipo Bio
   * @param response Resposta do servidor
   * @param app Aplicativo que será feita a atribuição dos IDs
   */
  static atribuirIdComponenteBio(response: any, app: AplicativoBio): void {
    app.id = response.id;
    if (response.imagem) {
      app.imagem.id = response.imagem.id
    }

    if (response.texto) {
      app.texto.id = response.texto.id;
    }
  }

  /**
   * Atribui os ids retornados do backend para um componente do tipo Texto
   * @param response Resposta do servidor
   * @param app Aplicativo que será feita a atribuição dos IDs
   */
  static atribuirIdComponenteTexto(response: any, app: AplicativoTexto): void {
    app.id = response.id;
    for (let i = 0; i < app.texto_array.length; i++) {
      app.texto_array[i].id = response.textos[i].id;
    }
  }

  /**
   * Atribui os ids retornados do backend para um componente do tipo Foto
   * @param response Resposta do servidor
   * @param app Aplicativo que será feita a atribuição dos IDs
   */
  static atribuirIdComponenteFoto(response: any, app: AplicativoFoto): void {
    app.id = response.id;
    app.imagem.id = response.imagem.id;
  }

  /**
   * Atribui os ids retornados do backend para um componente do tipo Flickr
   * @param response Resposta do servidor
   * @param app Aplicativo que será feita a atribuiçao dos IDs
   */
  static atribuirIdComponenteFlickr(response: any, app: AplicativoFlickr): void {
    app.id = response.id;
    for (let i = 0; i < app.imagensFlickr.length; i++) {
      app.imagensFlickr[i].id = response.imagensFlickr[i].id;
    }
  }

  /**
   * Atribui os ids retornados do backend para um componente do tipo Freesound
   * @param response Resposta do servidor
   * @param app Aplicativo que será feita a tribuição dos IDs
   */
  static atribuirIdComponenteFreesound(response: any, app: AplicativoFreesound): void {
    app.id = response.id;
    for (let i = 0; i < app.audios.length; i++) {
      app.audios[i].id = response.audios[i].id;
    }
  }
  
  /**
   * Atribui os ids retornados do backend para um componente do tipo Github
   * @param response Resposta do servidor
   * @param app Aplicativo que será feita a atribuição dos IDs
   */
  static atribuirIdComponenteGithub(response: any, app: AplicativoGithub): void {
    app.id = response.id;
    for (let i = 0; i < app.repos.length; i++) {
      app.repos[i].id = response.repos[i].id;
    }
  }


  static montarDadosAplicativos(dadosRaw: any[]): AplicativoBase[] {
    let appsBackEnd: AplicativoBase[] = [];

    dadosRaw.forEach((dado, index) => {
      switch (dado.data.tipo) {
        case 'ComponenteBio':
          appsBackEnd.push(this.montarDadosAplicativoBio(dado.data, index));
          break;
        case 'ComponenteTexto':
          appsBackEnd.push(this.montarDadosAplicativoTexto(dado.data, index));
          break;
        case 'ComponenteImagem':
          appsBackEnd.push(this.montarDadosAplicativoImagem(dado.data, index));
          break;
        case 'ComponenteGithub':
          appsBackEnd.push(this.montarDadosAplicativoGithub(dado.data, index));
          break;
        case 'ComponenteFlickrNeo':
          appsBackEnd.push(this.montarDadosAplicativoFlickr(dado.data, index));
          break;
        case 'ComponenteFreesound':
          appsBackEnd.push(this.montarDadosAplicativoFreesound(dado.data, index));
          break;
        default:
      }
    })


    return appsBackEnd;
  }

  static montarDadosAplicativoTexto(dado: any, i: number): AplicativoTexto {
    let novoApp = new AplicativoTexto();
    novoApp.id = dado.id;
    novoApp.component_name = dado.titulo || '';
    novoApp.bgColor = dado.backgroundColor || '#DADADA';
    novoApp.fgColor = dado.foregroundColor || '#333333';
    novoApp.order = dado.ordem !== null && dado.ordem !== null ?  dado.ordem : i;
    novoApp.showAppTitle = dado.mostrarTitulo;
    novoApp.type = 'texto';
    novoApp.isEditable = false;
    novoApp.isEdit = false;
    novoApp.texto_array = dado.textos.map(texto => {
      let novoTexto = new Texto()
      novoTexto.id = texto.id;
      novoTexto.body = texto.descricao;
      novoTexto.title = texto.titulo;
      return novoTexto;
    })
    return novoApp
  }

  static montarDadosAplicativoImagem(dado: any, i: number): AplicativoFoto {
    let novoApp = new AplicativoFoto();
    novoApp.id = dado.id;
    novoApp.component_name = dado.titulo || '';
    novoApp.bgColor = dado.backgroundColor || '#DADADA';
    novoApp.fgColor = dado.foregroundColor || '#333333';
    novoApp.order = dado.ordem !== null && dado.ordem !== null ?  dado.ordem : i;
    novoApp.showAppTitle = dado.mostrarTitulo;
    novoApp.type = 'fotos';
    novoApp.isEditable = false;
    novoApp.isEdit = false;
    novoApp.imagem = dado.imagem ? Object.assign({}, dado.imagem) : null;
    if (novoApp.imagem) {
      novoApp.imagem.base64Img = `data:image/jpeg;base64,${novoApp.imagem.base64Img}`;
    }
    return novoApp;
  }

  static montarDadosAplicativoBio(dado: any, i: number): AplicativoBio {
    let novoApp = new AplicativoBio();
    novoApp.id = dado.id;
    novoApp.component_name = dado.titulo || `Componente Bio [${i}]`;
    novoApp.bgColor = dado.backgroundColor || '#DADADA';
    novoApp.fgColor = dado.foregroundColor || '#333333';
    novoApp.order = dado.ordem !== null && dado.ordem !== null ?  dado.ordem : i;
    novoApp.showAppTitle = dado.mostrarTitulo;
    novoApp.type = 'bio';
    novoApp.isEditable = false;
    novoApp.isEdit = false;
    novoApp.imagem = dado.imagem ? Object.assign({}, dado.imagem) : null;
    if (novoApp.imagem) {
      novoApp.imagem.base64Img = `data:image/jpeg;base64,${novoApp.imagem.base64Img}`;
    }
    novoApp.texto = new Texto();
    novoApp.texto.id = dado.texto.id;
    novoApp.texto.title = dado.texto.titulo;
    novoApp.texto.body = dado.texto.descricao || 'Este é o componente para sua biografia! Edite como quiser.';

    return novoApp;
  }

  static montarDadosAplicativoFlickr(dado: any, i: number): AplicativoFlickr {
    let novoApp = new AplicativoFlickr();
    novoApp.id = dado.id;
    novoApp.username = dado.username;
    novoApp.component_name = dado.titulo || '';
    novoApp.bgColor = dado.backgroundColor || '#DADADA';
    novoApp.fgColor = dado.foregroundColor || '#333333';
    novoApp.order = dado.ordem !== null && dado.ordem !== null ?  dado.ordem : i;
    novoApp.showAppTitle = dado.mostrarTitulo;
    novoApp.type = 'flickr';
    novoApp.isEditable = false;
    novoApp.isEdit = false;
    novoApp.imagensFlickr = dado.imagensFlickr.map(img => {
      return {id: img.id, secretId: img.secretId}
    })
    return novoApp
  }

  static montarDadosAplicativoFreesound(dado: any, i: number): AplicativoFreesound {
    let novoApp = new AplicativoFreesound();
    novoApp.id = dado.id;
    novoApp.username = dado.username;
    novoApp.component_name = dado.titulo || '';
    novoApp.bgColor = dado.backgroundColor || '#DADADA';
    novoApp.fgColor = dado.foregroundColor || '#333333';
    novoApp.order = dado.ordem !== null && dado.ordem !== null ?  dado.ordem : i;
    novoApp.showAppTitle = dado.mostrarTitulo;
    novoApp.type = 'freesound';
    novoApp.isEditable = false;
    novoApp.isEdit = false;
    novoApp.audios = dado.audios.map(audio => {
      return {id: audio.id, secretId: audio.secretId}
    })
    return novoApp
  }

  static montarDadosAplicativoGithub(dado: any, i: number): AplicativoGithub {
    let novoApp = new AplicativoGithub();
    novoApp.id = dado.id;
    novoApp.username = dado.username;
    novoApp.component_name = dado.titulo || '';
    novoApp.bgColor = dado.backgroundColor || '#DADADA';
    novoApp.fgColor = dado.foregroundColor || '#333333';
    novoApp.order = dado.ordem !== null && dado.ordem !== null ?  dado.ordem : i;
    novoApp.showAppTitle = dado.mostrarTitulo;
    novoApp.type = 'github';
    novoApp.isEditable = false;
    novoApp.isEdit = false;
    novoApp.repos = dado.repos.map(repo => {
      return {id: repo.id, secretId: repo.secretId}
    })
    return novoApp
  }

}
export class ComponenteBackBase {
  id: number = null;
  ordem: number = null;
  tipo: string = null;
  titulo: string = '';
  backgroundColor: string = '';
  foregroundColor: string = '';
  mostrarTitulo: boolean = true;
}
export class ComponenteTexto extends ComponenteBackBase {
  tipo: string = 'ComponenteTexto';
  textos: Array<TextoBack> = [];
}
export class ComponenteBio extends ComponenteBackBase {
  tipo: string = 'ComponenteBio';
  imagem: FileGregs = null;
  texto: TextoBack = null;
}

export class ComponenteFoto extends ComponenteBackBase {
  tipo: string = 'ComponenteImagem'
  imagem: FileGregs = null;
}

export class ComponenteFlickr extends ComponenteBackBase {
  tipo: string = 'ComponenteFlickrNeo';
  username: string = '';
  imagensFlickr: Array<FlickrItemBack> = [];
}

export class ComponenteGithub extends ComponenteBackBase {
  tipo: string = 'ComponenteGithub';
  username: string = '';
  repos: Array<RepoBack> = [];
}

export class ComponenteFreesound extends ComponenteBackBase {
  tipo: string = 'ComponenteFreesound';
  username: string = '';
  audios: Array<AudioBack> = [];
}
export class TextoBack {
  id: number = null;
  titulo: string = '';
  descricao: string = '';
}

export class FlickrItemBack {
  id: number = null;
  secretId: string = '';
}

export class RepoBack {
  id: number = null;
  secretId: number = null;
}
export class AudioBack {
  id: number = null;
  secretId: string = '';
}