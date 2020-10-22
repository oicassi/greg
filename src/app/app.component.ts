import { TokenService } from './core/_services/token.service';
import { AlertService } from './shared/components/alert/alert.service';
import { Usuario } from './shared/models/user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/_services';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: Usuario;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private bnIdle: BnNgIdleService,
    private alertService: AlertService,
    private tokenService: TokenService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
    this.bnIdle.startWatching(10).subscribe((isTimedOut: boolean) => {
      if (isTimedOut && this.currentUser) {
        this.alertService.warning('Sessão expirada, logue novamente');
        this.logout();
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["login"]);
  }
}
