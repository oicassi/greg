import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { FactoryService } from '@services/factory.service';
import { AplicativoService } from '@services/aplicativo.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AplicativoBase } from '@models/aplicativo';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  loading: boolean = false;
  sidebarButtonIcon = 'menu';

  @ViewChild('sidebar', {static: false}) sidebar: ElementRef;
  @ViewChild('sidebarButton', {static: false}) sidebarBtn: ElementRef;
  resizeObs: Observable<Event>;
  resizeSubs: Subscription;
  botaoSalvarDisabled = false;

  constructor(
    private _appService: AplicativoService,
    public factoryService: FactoryService
  ) {
    this.loading = true;
    this.resizeObs = fromEvent(window, 'resize')
  }

  ngOnInit() {
    this.carregarComponentes()
    this.resizeSubs = this.resizeObs
      .pipe(
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe((event) => {
      this.handleResize();
    })
    this.loading = false;
  }

  carregarComponentes() {
    this._appService.carregarAplicativos().subscribe(resposta => {
      console.log('Olha so que coisa');
      console.log(resposta);
    }, (err => {
      console.log('Mas ocorreu um erro bem chato');
      console.log(err)
    }))
  }


  ordenarAppList(list: AplicativoBase[]): void {
    list.sort((a, b) => a.order - b.order);
  }


  get appList() {
    let lista =  this._appService.getAplicativos();
    this.ordenarAppList(lista);
    return lista;

  }

  toggleClass(): void {
    // Altera a classe da sidebar
    if (this.sidebar.nativeElement.classList.contains('edit-open-sidebar')) {
      this.sidebar.nativeElement.classList.remove('edit-open-sidebar');
    } else {
      this.sidebar.nativeElement.classList.add('edit-open-sidebar')
    }

    // Altera a classe do botão
    if (this.sidebarBtn.nativeElement.classList.contains('edit-open-sidebar-btn')) {
      this.sidebarBtn.nativeElement.classList.remove('edit-open-sidebar-btn');
      this.sidebarButtonIcon = 'menu';
    } else {
      this.sidebarBtn.nativeElement.classList.add('edit-open-sidebar-btn');
      this.sidebarButtonIcon = 'menu_open';
    }
  }

  handleResize(): void {
    if (window.innerWidth > 850) {
      this.sidebar.nativeElement.classList.remove('edit-open-sidebar');
      this.sidebarBtn.nativeElement.classList.remove('edit-open-sidebar-btn');
      this.sidebarButtonIcon = 'menu';
    }
  }

  /**
   * Salvar o estado atual dos componentes
   */
  async salvarComponentes():Promise<void> {
    this.loading = true;
    try {
      this.botaoSalvarDisabled = true;
      const response = await this._appService.salvarAplicativos();
      console.log('Acho que deu boa');
      if (response) {
        console.log(response);
        this._appService.atribuirIdsAposSalvar(response);
        console.log('Será que deu certo????');
        console.log(this.appList);
      }

    } catch (err) {
      console.log('Ocorreu um erro ao salvar os componentes')
      console.log(err)
    } finally {
      this.botaoSalvarDisabled = false;
      this.loading = false;
    }
  }

}
