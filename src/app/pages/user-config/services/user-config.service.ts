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
        const formData: FormData = new FormData();
        formData.append('fileKey', userConfigs.imagemUsuario, userConfigs.imagemUsuario.nome);
        return this.http.put(environment.apiUrl, formData);
    }

}
