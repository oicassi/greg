import {UserConfigs} from './../../shared/models/user-configs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {environment} from "src/environments/environment";
import {Usuario} from './../../shared/models/user';


@Injectable({providedIn: "root"})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/users`);
  }

  getByEmail(email: string) {
    let params = new HttpParams().set("email", email)
    return this.http.get(`${environment.apiUrl}/usuarios/`, {params: params});
  }

  register(user: Usuario) {
    return this.http.post(`${environment.apiUrl}/usuarios`, user);
  }

  update(user: Usuario) {
    return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

  login(email, password) {
    return this.http.put(`${environment.apiUrl}/login`, {email, password});
  }

  postForm(userConfigs: UserConfigs) {
    return this.http.put(environment.apiUrl + '/usuarios', userConfigs);
  }

  getUser() {
    return this.http.get(environment.apiUrl + '/usuarios/configs');
  }
}
