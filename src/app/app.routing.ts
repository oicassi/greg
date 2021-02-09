import {EditPageComponent} from '@pages/edit-page/edit-page.component';
import {FullpreviewComponent} from '@pages/fullpreview/fullpreview.component';
import {HomeAdminComponent} from '@pages/home-admin/home-admin.component';
import {SearchComponent} from '@pages/search/search.component';
import {UserConfigComponent} from '@pages/user-config/user-config.component';
import {NotFoundComponent} from '@pages/not-found/not-found.component';
import {LoginRegisterComponent} from '@pages/login-register/login-register.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from './core/_guards/auth.guard';
import {VisualizacaoComponent} from "@pages/visualizacao/visualizacao.component";

const appRoutes: Routes = [
  {path: "", component: SearchComponent, data: {title: 'Home'}},
  {path: "search", component: SearchComponent, data: {title: 'Pesquisar'}},
  {path: "login", component: LoginRegisterComponent, data: {title: 'Login'}},
  {path: "admin", component: HomeAdminComponent, data: {title: 'Admin'}, canActivate: [AuthGuard]},
  {path: "fullpreview", component: FullpreviewComponent, data: {title: 'Preview'}, canActivate: [AuthGuard]},
  {path: "config", component: UserConfigComponent, data: {title: 'Configurações'}, canActivate: [AuthGuard]},
  {path: 'pagina/:user', component: VisualizacaoComponent, data: {title: 'Visualizar página'}},
  {path: 'editPage', component: EditPageComponent, data: {title: 'Editar Pagina'},},

  // otherwise redirect to home
  {path: "**", component: NotFoundComponent, data: {Title: 'Not found'}},
];

export const routing = RouterModule.forRoot(appRoutes);
