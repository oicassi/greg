import { UserConfigs } from './../../../shared/models/user-configs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

    constructor(private http: HttpClient) {}

    postForm(userConfigs: UserConfigs){
        return this.http.put(environment.apiUrl+ '/usuarios', userConfigs);
    }

    getUser(){
      return this.http.get(environment.apiUrl + '/usuarios/configs');
    }

}
