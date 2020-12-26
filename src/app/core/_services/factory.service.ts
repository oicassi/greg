import {
  AplicativoBase,
  AplicativoBio,
  AplicativoFlickr,
  AplicativoFoto,
  AplicativoFreesound,
  AplicativoGithub,
  AplicativoTags,
  AplicativoTexto
} from '@models/aplicativo';
import {AplicativosConstants} from '@constants/aplicativos';
import {Component, Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor() {
  }

  /**
   * Retorna um componente conforme o tipo passado
   * @param tipo
   */
  getAplicativo(tipo: string): Component {
    tipo = tipo.toUpperCase();
    return AplicativosConstants[tipo];
  }

  /**
   * Retorna um modelo
   * @param tipo Tipo do modelo de aplicativo
   */
  getModel(tipo: string): AplicativoBase {
    switch (tipo) {
      case 'bio':
        return new AplicativoBio();
      case 'flickr':
        return new AplicativoFlickr();
      case 'fotos':
        return new AplicativoFoto();
      case 'freesound':
        return new AplicativoFreesound();
      case 'github':
        return new AplicativoGithub();
      case 'tags':
        return new AplicativoTags();
      case 'texto':
        return new AplicativoTexto();
    }
  }
}
