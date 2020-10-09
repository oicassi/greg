﻿import { ResponseCustom } from './../_models/response';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { Usuario } from "src/app/core/_models";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(
      JSON.parse(localStorage.getItem("userToken"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  // this will be used soon
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
            localStorage.setItem("userToken", JSON.stringify(response.data));
            this.currentUserSubject.next(response.data);
          }

          return response;
        })
      );
    // debugger;
    //   this.http.post(`${environment.apiUrl}/login`, {email,password}).subscribe(x => {
    //     console.log(x);
    //   });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  isLogado(): boolean{
    return (localStorage.getItem("currentUser") ? true : false);
  }
}
