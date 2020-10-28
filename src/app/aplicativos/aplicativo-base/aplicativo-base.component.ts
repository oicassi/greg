import { 
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit, 
  TemplateRef, 
  ViewChild, 
  ViewContainerRef, 
  Type
} from '@angular/core';
import { AplicativoBase } from '@models/aplicativo';

@Component({
  selector: 'app-aplicativo-base',
  template: `<ng-template></ng-template>`,
})
export class AplicativoBaseComponent implements OnInit {
  @Input() dados: AplicativoBase;
  @Input() aplicativo: Type<Component>;

  @ViewChild(TemplateRef, {
    read: ViewContainerRef,
    static: true
  })
  viewContainerRef: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    console.log(`[AplicativoBase] ${this.dados.component_name}`);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.aplicativo
    );
  
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(componentFactory)
      .instance;
  
    // Passa os dados para a view filha
    componentRef['dados'] = this.dados;
  }

}
