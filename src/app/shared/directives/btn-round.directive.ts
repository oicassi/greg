import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[btnRound]'
})
export class BtnRoundDirective implements OnInit{
  
  @Input()padding: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    if (this.el.nativeElement.tagName.toLowerCase() !== 'button') {
      console.warn(`btnRound aplicado em componente não botão. Aplicado em: ${this.el.nativeElement.tagName.toLowerCase()}`);
      return
    }
    this.el.nativeElement.style.borderRadius = '300px';
    this.el.nativeElement.style.padding = (this.padding || '5px 55px');
  }
}
