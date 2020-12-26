import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import * as jwt_decode from 'jwt-decode';
import {BehaviorSubject, Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {UserService} from 'src/app/core/_services';
import {environment} from "src/environments/environment";
import {GenericResponse} from './../../shared/models/responses/generic-response';
import {Usuario} from './../../shared/models/user';
import {TokenService} from './token.service';


@Injectable({providedIn: "root"})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private userService: UserService
  ) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(
      null
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.getUser();
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  getUser() {
    if (this.tokenService.hasToken()) {
      let usuario: Usuario = jwt_decode(this.tokenService.getToken());
      this.userService.getByEmail(usuario.sub)
        .pipe(map((usuario: GenericResponse<Usuario>) => {
          this.currentUserSubject.next(usuario.data);
        }))
        .subscribe();
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        map((response: GenericResponse<Usuario>) => {
          // login successful if there's a jwt token in the response
          if (response.data) {
            // store response details and jwt token in local storage to keep response logged in between page refreshes
            this.tokenService.setToken(response.data.authorization)
          }
          return response;
        })
      )
      .pipe(
        switchMap((user) => {
          return this.userService.getByEmail(user.data.sub)
        })
      )
      .pipe(
        map((socorro: GenericResponse<Usuario>) => {
          return this.currentUserSubject.next(socorro.data);
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    this.tokenService.removeToken();
    this.currentUserSubject.next(null);
  }

  isLogado(): boolean {
    return this.tokenService.hasToken();
  }

  atualizaUser(user: Usuario) {
    this.currentUserSubject.next(user);
  }
}
