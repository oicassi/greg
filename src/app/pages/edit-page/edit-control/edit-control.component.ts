import { Router } from '@angular/router';
import { AplicativoBase } from '@models/aplicativo';
import { AplicativoService } from '@services/aplicativo.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PagesService } from '@services/pages.service';
import { UserPageGlobal } from '@models/user';

@Component({
  selector: 'app-edit-control',
  templateUrl: './edit-control.component.html',
  styleUrls: ['./edit-control.component.scss']
})
export class EditControlComponent implements OnInit {

  isConfigMenuOpen = false;
  
  constructor(
    private _appSrv: AplicativoService,
    private _pagesSrv: PagesService,
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Ordena os aplicativos com base no order
    this.ordenarAplicativos();
  }

  /**
   * Getter da propriedade aplicativos
   */
  get aplicativos(): AplicativoBase[] {
    return this._appSrv.getAplicativos();
  }

  /**
   * Setter da propriedade aplicativos
   */
  set aplicativos(aplicativos: AplicativoBase[]) {
    this._appSrv.setAplicativos(aplicativos);
  }

  /**
 * Setter dos dados da página
 */
  set dadosUsuario(dados: UserPageGlobal) {
    this._pagesSrv.setPageGlobalInfo(dados);
  }

  /**
   * Getter dos dados da página
   */
  get dadosUsuario(): UserPageGlobal {
    return this._pagesSrv.getPageGlobalInfo();
  }

  /**
   * Realiza a ordenação dos aplicativos
   */
  ordenarAplicativos(): void {
    this.aplicativos = this.aplicativos.sort((a, b) => a.order - b.order);
    this.aplicativos.forEach((app, i) => app.order = i);
  }

  /**
   * Toggler para abertura e fechamento do menu de configuração
   */
  toggleConfigMenu(): void {
    this.isConfigMenuOpen = !this.isConfigMenuOpen;
  }

  /**
   * Visualizar a página completa
   */
  visualizarPagina(): void {
    this._pagesSrv.visualizarPreview = true;
    this._pagesSrv.carregarDados = false;
    this._router.navigate(['/fullpreview'])
  }

  /**
   * Handler para alteração de cor de fundo da página
   * @param color Nova cor
   */
  onColorChange(color: string): void {
    this.dadosUsuario.pageBgColor = color;
  }

  /**
   * Listener para o evento de drop do cdk drag and drop
   * @param event Evento
   */
  drop(event: CdkDragDrop<string[]>): void {
    console.log(this.aplicativos);
    moveItemInArray(this.aplicativos, event.previousIndex, event.currentIndex);
    this.aplicativos.forEach((app, i) => app.order = i);
    console.log('%cAplicativo reordenado com sucesso', 'color: purple');
    console.log(this.aplicativos);
    this._cdr.detectChanges();
  }


  checkState() {
    console.log('%cCHECAGEM DE ESTADO', 'font-size: 24px; color: orange');
    console.log(this.aplicativos);
  }
}