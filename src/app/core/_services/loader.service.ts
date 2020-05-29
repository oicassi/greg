import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading: boolean;

  constructor() { 
    this.isLoading = false;
  }

  /**
   * Seta isLoading para true visando mostrar o loader na tela
   */
  showLoader() {
    this.isLoading = true;
  }
  
  /**
   * Seta isLoading para false visando esconder o loader da tela
   */
  hideLoader() {
    this.isLoading = false;
  }

  /**
   * Retorna o estado do loader
   */
  getLoader() {
    return this.isLoading
  }
}
