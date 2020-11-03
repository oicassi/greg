import { AplicativosConstants } from '@constants/aplicativos';
import { Injectable, Component } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor() { }

  /**
   * Retorna um componente conforme o tipo passado
   * @param tipo 
   */
  getAplicativo(tipo: string): Component {
    tipo = tipo.toUpperCase();
    return AplicativosConstants[tipo];
  }
}
