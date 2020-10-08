import { Injectable } from '@angular/core';
import { ResumoItem } from 'src/app/preview/resumo/resumo.component';
import { Info } from 'src/app/shared/models/info.model';

export class ResumoRestore {
  id: number;
  conteudo: ResumoItem[];
}

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  compsLigadosTemp: Info[] = [];
  resumos: ResumoRestore[] = [];
  

  constructor() { }

  setCompsLigados(comps: Info[]){
    this.compsLigadosTemp = Object.assign([], comps);
  }

  getCompsLigados() {
    return this.compsLigadosTemp;
  }

  setResumos(id: number, resumos: ResumoItem[]) {
    let resumoRestoreItem = new ResumoRestore();
    resumoRestoreItem.id = id;
    resumoRestoreItem.conteudo = Object.assign([], resumos);
    let i = this.resumos.findIndex(res => res.id === id) 
    if (i > -1) {
      this.resumos[i] = resumoRestoreItem;
      console.log("Atualizado resumo")
      console.log(this.resumos);
      return;
    }
    this.resumos.push(resumoRestoreItem);
    console.log("resumos salvos");
    console.log(this.resumos);
  }

  getResumos(id: number) {
    let i = this.resumos.findIndex(res => res.id === id);
    if (i > -1) {
      return this.resumos[i].conteudo;
    }
  }
  


}
