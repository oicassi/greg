import { AplicativoBio } from './../../shared/models/aplicativo';
import { AplicativoBase, AplicativoTexto } from '@models/aplicativo';
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

    }
  }

  /**
   * Constrói o payload para salvar um componente do tipo texto
   * @param app AplicativoTexto base
   */
  static montarTextoPayload(app: AplicativoTexto): ComponenteTexto {
    let componente = new ComponenteTexto();
    componente.titulo = app.component_name;
    componente.mostrarTitulo = app.showAppTitle;
    componente.backgroundColor = app.bgColor;
    componente.foregroundColor = app.fgColor;
    componente.textos = app.texto_array.map((texto) => {
      let novoTexto = new TextoBack();
      novoTexto.titulo = texto.title;
      novoTexto.descricao = texto.body
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
    componente.titulo = app.component_name;
    componente.mostrarTitulo = app.showAppTitle;
    componente.backgroundColor = app.bgColor;
    componente.foregroundColor = app.fgColor;
    componente.texto = new TextoBack();
    componente.texto.titulo = app.component_name;
    componente.texto.id = null;
    componente.texto.descricao = app.texto;
    componente.id = null;
    componente.imagem = app.imagem;
    componente.imagem.base64Img = componente.imagem.base64Img.replace(/^data:image\/[a-z]+;base64,/, "");

    return componente;
  }
}

export class ComponenteBackBase {
  id: number = null;
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
export class TextoBack {
  id: number = null;
  titulo: string = '';
  descricao: string = '';
}