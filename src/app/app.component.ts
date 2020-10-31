import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { filter, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/_services';
import { AlertService } from './shared/components/alert/alert.service';
import { Usuario } from './shared/models/user';

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
    private titleService: Title,
    private activatedRoute: ActivatedRoute
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
    this.mudaTitle();
    this.idleKiller();
  }

  mudaTitle() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map(route => {
        while (route.firstChild) {
          route = route.firstChild;
          return route;
        }
      }))
      .pipe(switchMap(route => route.data))
      .subscribe(event => {
        console.log(event);
        this.titleService.setTitle('GREGS - ' + event.title)
      });
  }

  idleKiller() {
    this.bnIdle.startWatching(1200).subscribe((isTimedOut: boolean) => {
      if (isTimedOut && this.currentUser) {
        this.alertService.warning('Sessão expirada, logue novamente');
        this.logout();
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate([""]);
  }
}
