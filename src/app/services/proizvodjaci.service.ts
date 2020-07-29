import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proizvodjac } from '../models/Proizvodjac';

@Injectable({
  providedIn: 'root'
})
export class ProizvodjaciService {

  serviceUrl = `${environment.apiUrl}/proizvodjaci`;

  constructor(private http: HttpClient) { }

  public getProizvodjaci() {
    return this.http.get<Proizvodjac[]>(this.serviceUrl);
  }


}

