import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class TagService {

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/tags/all`);
      }

}
