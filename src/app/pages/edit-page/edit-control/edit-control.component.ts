import { UserService } from './../../../core/_services/user.service';
import { AlertService } from './../../../shared/components/alert/alert.service';
import { Router } from '@angular/router';
import { AplicativoBase } from '@models/aplicativo';
import { AplicativoService } from '@services/aplicativo.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PagesService } from '@services/pages.service';
import { UserPageGlobal } from '@models/user';
import { GenericResponse } from '@models/responses/generic-response';
import { UserConfigs } from '@models/user-configs';

@Component({
  selector: 'app-edit-control',
  templateUrl: './edit-control.component.html',
  styleUrls: ['./edit-control.component.scss']
})
export class EditControlComponent implements OnInit {

  isConfigMenuOpen = false;
  isShareMenuOpen = false;
  urlPagina: string = '';

  constructor(
    private _appSrv: AplicativoService,
    private _pagesSrv: PagesService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _alertSrv: AlertService,
    private _userSrv: UserService,
  ) { }

  ngOnInit() {
    // Ordena os aplicativos com base no order
    this.ordenarAplicativos();
    this._userSrv
      .getUser()
      .subscribe((resposta: GenericResponse<UserConfigs>) => {
        this.urlPagina = `http://localhost:4200/pagina/${resposta.data.urlPagina}`;
      },
        (err => {
          console.log(err);
        }))
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
   * Toggler para abertura e fechamento do menu de compartilhamento
   */
  toggleShareMenu(): void {
    this.isShareMenuOpen = !this.isShareMenuOpen
  }

  /**
   * Visualizar a página completa
   */
  visualizarPagina(): void {
    this._pagesSrv.visualizarPreview = true;
    this._pagesSrv.carregarDados = false;
    this.aplicativos.forEach(app => app.isEdit = false);
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
    moveItemInArray(this.aplicativos, event.previousIndex, event.currentIndex);
    this.aplicativos.forEach((app, i) => app.order = i);
    this._cdr.detectChanges();
  }

  copiarLinkAreaTransferencia() {
    this._alertSrv.info('Link para página copiado para área de transferência');
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.urlPagina;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
