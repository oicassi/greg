import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {

  constructor() { }

  private cores = {
    purple:'#b894f6',
    yellow:'#fefb99',
    blue: '#94a1f6',
    pink: '#e994f6',
    red: '#E57373',
    green: '#80CBC4',
    brown: '#BCAAA4',
    white: '#fcfaf9',
  }

  getHexaColor(color:string) {
    return this.cores[color];
  }
}
