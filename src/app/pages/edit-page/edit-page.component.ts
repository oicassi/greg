import { PagesService } from '@services/pages.service';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { FactoryService } from '@services/factory.service';
import { AplicativoService } from '@services/aplicativo.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AplicativoBase } from '@models/aplicativo';
import { UserService } from '@services/user.service';
import { AlertService } from '@shared-components/alert/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  loadingState: boolean = false;
  sidebarButtonIcon = 'menu';

  @ViewChild('sidebar', {static: false}) sidebar: ElementRef;
  @ViewChild('sidebarButton', {static: false}) sidebarBtn: ElementRef;
  resizeObs: Observable<Event>;
  resizeSubs: Subscription;
  botaoSalvarDisabled = false;

  constructor(
    private _appService: AplicativoService,
    private _userSrv: UserService,
    private _pagesSrv: PagesService,
    private alertService: AlertService,
    public factoryService: FactoryService
  ) {
    this.resizeObs = fromEvent(window, 'resize')
  }

  ngOnInit() {
    this.loadingState = true;
    this.carregarComponentes()
    this.resizeSubs = this.resizeObs
      .pipe(
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe((event) => {
      this.handleResize();
    })
  }

  async carregarComponentes() {
    if (!this._pagesSrv.carregarDados) {
      this.loadingState = false;
      return;
    }
    this.loadingState = true;
    let urlUser;
    try {
      const resposta = await this._userSrv.getUser().toPromise();
      if (resposta && resposta['data'] && resposta['data'].urlPagina) {
        urlUser = resposta['data']['urlPagina'];
      } else {
        throw new Error('Não foi possível recuperar a URL da página');
      }
    } catch (err) {
      this.alertService.danger('Não foi encontrada a URL da página do usuário :(')
      console.log('Ocorreu um erro ao tentar buscar URL da página');
      console.log(err);
      this.loadingState = false;
      return;
    }
    this._appService.carregarAplicativos(urlUser).subscribe(resposta => {
      console.log('Olha so que coisa');
      console.log(resposta);
      this.appList = resposta as AplicativoBase[]
      this.loadingState = false;
    }, (err => {
      this.alertService.danger('Ocorreu um erro ao buscar os componentes')
      console.log('Mas ocorreu um erro bem chato');
      console.log(err)
      this.loadingState = false;
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

  set appList(apps: AplicativoBase[]) {
    this._appService.setAplicativos(apps);
  }

  get loading(): boolean {
    return this.loadingState;
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
    this.loadingState = true;
    try {
      this.botaoSalvarDisabled = true;
      const response = await this._appService.salvarAplicativos();
      console.log('Acho que deu boa');
      if (response) {
        console.log(response);
        this.alertService.success('Componentes salvos/alterados com sucesso!')
        console.log('Será que deu certo????');
        console.log(this.appList);
      }

    } catch (err) {
      this.alertService.danger('Ocorreu um erro ao salvar/alterar os componentes')
      console.log('Ocorreu um erro ao salvar os componentes')
      console.log(err)
    } finally {
      this.botaoSalvarDisabled = false;
      this.loadingState = false;
    }
  }

}
