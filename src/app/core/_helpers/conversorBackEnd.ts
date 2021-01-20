import { AplicativoBase, AplicativoTexto } from '@models/aplicativo';
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
        return this.montarTextoPayload(app as AplicativoTexto)
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
}

export class ComponenteBackBase {
  id: number = null;
  titulo: string = '';
}

export class ComponenteTexto extends ComponenteBackBase {

  tipo: string = 'ComponenteTexto';
  mostrarTitulo: boolean = true;
  backgroundColor: string = '';
  foregroundColor: string = '';
  textos: Array<TextoBack> = []

}

export class TextoBack {
  id: number = null;
  titulo: string = '';
  descricao: string = '';
}