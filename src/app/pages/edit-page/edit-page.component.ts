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
  @ViewChild('sidebar', {static: false}) sidebar: ElementRef;
  @ViewChild('sidebarButton', {static: false}) sidebarBtn: ElementRef;
  resizeObs: Observable<Event>;
  resizeSubs: Subscription;

  constructor(
    private _appService: AplicativoService,
    public factoryService: FactoryService
  ) {
    this.loading = true;
    this.resizeObs = fromEvent(window, 'resize')
  }

  ngOnInit() {
    this.resizeSubs = this.resizeObs
      .pipe(
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe((event) => {
      this.handleResize();
    })


    setTimeout(() => {
      this.loading = false;
    }, 1000)
    setTimeout(() => {
      console.log('%cFOIIIIIIII', 'color:purple');
      this._appService.addQualquerCoisa();
    }, 5000);
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
      this.sidebarBtn.nativeElement.classList.remove('edit-open-sidebar-btn')
    } else {
      this.sidebarBtn.nativeElement.classList.add('edit-open-sidebar-btn')
    }
  }

  handleResize(): void {
    if (window.innerWidth > 850) {
      this.sidebar.nativeElement.classList.remove('edit-open-sidebar');
      this.sidebarBtn.nativeElement.classList.remove('edit-open-sidebar-btn');

    }
  }

}
