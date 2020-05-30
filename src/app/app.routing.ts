import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from "@angular/router";

import { HomeAdminComponent } from "./home-admin";
import { LoginComponent } from "./login";
import { RegisterComponent } from "./register";
import { AuthGuard } from "src/app/core/_guards";
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "admin", component: HomeAdminComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: "**", redirectTo: "" },
];

export const routing = RouterModule.forRoot(appRoutes);
