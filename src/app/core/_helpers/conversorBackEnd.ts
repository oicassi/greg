import { AplicativoBase, AplicativoTexto, AplicativoBio, AplicativoFoto } from '@models/aplicativo';
import { FileGregs } from '@models/file-greg';
export class ConversorBackEnd {

  /**
   * Constrói um payload para salvar um componente conforme especificações do servidor
   * @param app Aplicativo que está sendo salvo
   */
  static montarPayload(app: AplicativoBase): ComponenteBackBase {
    if (!app) {
      return null;
    }
    switch (app.type) {
      case 'texto':
        return this.montarTextoPayload(app as AplicativoTexto);
      case 'bio':
        return this.montarBioPayload(app as AplicativoBio);
      case 'fotos':
        return this.montarFotoPayload(app as AplicativoFoto);
    }
  }

  /**
   * Constrói o payload para salvar um componente do tipo texto
   * @param app AplicativoTexto base
   */
  static montarTextoPayload(app: AplicativoTexto): ComponenteTexto {
    let componente = new ComponenteTexto();
    componente.id = app.id || null;
    componente.titulo = app.component_name;
    componente.mostrarTitulo = app.showAppTitle;
    componente.backgroundColor = app.bgColor;
    componente.foregroundColor = app.fgColor;
    componente.textos = app.texto_array.map((texto) => {
      let novoTexto = new TextoBack();
      novoTexto.titulo = texto.title;
      novoTexto.descricao = texto.body
      novoTexto.id = texto.id || null;
      return novoTexto;
    })

    return componente;
  }

  /**
   * Constrói o payload para salvar um componente do tipo bio
   * @param app AplicativoBio base
   */
  static montarBioPayload(app: AplicativoBio): ComponenteBio {
    let componente = new ComponenteBio();
    componente.id = app.id || null;
    componente.titulo = app.component_name;
    componente.mostrarTitulo = app.showAppTitle;
    componente.backgroundColor = app.bgColor;
    componente.foregroundColor = app.fgColor;
    componente.texto = new TextoBack();
    componente.texto.titulo = app.texto.title;
    componente.texto.id = app.texto.id || null;
    componente.texto.descricao = app.texto.body;
    componente.imagem = app.imagem ? Object.assign({}, app.imagem) : null;
    if (componente.imagem && componente.imagem.base64Img) {
      componente.imagem.base64Img = componente.imagem.base64Img.replace(/^data:image\/[a-z]+;base64,/, "");
    }
    
    return componente;
  }
  
  /**
   * Constrói o payload para salvar um componente do tipo foto
   * @param app AplicativoFoto base
   */
  static montarFotoPayload(app: AplicativoFoto): ComponenteFoto {
    let componente = new ComponenteFoto();
    componente.id = app.id || null;
    componente.titulo = app.component_name;
    componente.mostrarTitulo = app.showAppTitle;
    componente.backgroundColor = app.bgColor;
    componente.foregroundColor = app.fgColor;
    componente.id = null;
    componente.imagem = app.imagem ? Object.assign({}, app.imagem) : null;
    if (componente.imagem && componente.imagem.base64Img) {
      componente.imagem.base64Img = componente.imagem.base64Img.replace(/^data:image\/[a-z]+;base64,/, "");
    }
    
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
    console.log('DJANHO')
    console.log(app);
    console.log(app.id);
    console.log(app.imagem);
    console.log(app.imagem.id);
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

}


export class ComponenteBackBase {
  id: number = null;
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
export class TextoBack {
  id: number = null;
  titulo: string = '';
  descricao: string = '';
}