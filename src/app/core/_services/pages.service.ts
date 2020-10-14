import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private _http: HttpClient) { }

  getAllTags() {
    return this._http.get<string[]>(`${environment.tagApiUrl}/alltags`);
  }

  searchCards(terms: string) {
    let searchTerms = terms.split(' ');
    return this._http.post<Card[]>(`${environment.tagApiUrl}/searchTags`, searchTerms);
  }
}
