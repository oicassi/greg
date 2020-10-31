import { TokenService } from './token.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ResponseCustom } from '../../shared/models/responses/response';
import { Usuario } from './../../shared/models/user';


@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(private http: HttpClient, private tokenService:  TokenService) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(
      jwt_decode(this.tokenService.getToken())
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        map((response: ResponseCustom) => {
          // login successful if there's a jwt token in the response
          if (response.data) {
            // store response details and jwt token in local storage to keep response logged in between page refreshes
            this.tokenService.setToken(response.data.authorization)
            this.currentUserSubject.next(jwt_decode(response.data.authorization));
          }
          return response;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    this.tokenService.removeToken();
    this.currentUserSubject.next(null);
  }

  isLogado(): boolean{
    return this.tokenService.hasToken();
  }
}
