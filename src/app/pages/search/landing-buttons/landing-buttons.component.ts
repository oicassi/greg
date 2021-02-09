import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-landing-buttons',
  templateUrl: './landing-buttons.component.html',
  styleUrls: ['./landing-buttons.component.scss']
})
export class LandingButtonsComponent implements OnInit {
  titulo = environment.titulo
  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  login(): void {
    this._router.navigate(['/login']);
  }

  register(): void {
    this._router.navigate(['/login'], { queryParams: { action: 'register' } });
  }

}
