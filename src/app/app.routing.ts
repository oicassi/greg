import { HomeAdminComponent } from './home-admin/home-admin.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { Routes, RouterModule } from "@angular/router";

import { RegisterComponent } from "./register";
import { AuthGuard } from "src/app/core/_guards";
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: "", component: HomeComponent,  canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "admin", component: HomeAdminComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: "**", redirectTo: "" },
];

export const routing = RouterModule.forRoot(appRoutes);
