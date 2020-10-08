import { UserConfigComponent } from './pages/user-config/user-config.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { Routes, RouterModule } from "@angular/router";
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeComponent } from './home/home.component';


import { AuthGuard } from "src/app/core/_guards";
import { AppComponent } from './app.component';
import { FullpreviewComponent } from './fullpreview/fullpreview.component';

const appRoutes: Routes = [
  { path: "", component: HomeComponent,  canActivate: [AuthGuard] },
  { path: "login", component: LoginRegisterComponent },
  { path: "admin", component: HomeAdminComponent, canActivate: [AuthGuard] },
  { path: "fullpreview", component: FullpreviewComponent},
  { path: "config", component: UserConfigComponent},

  // otherwise redirect to home
  { path: "**", component: NotFoundComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
