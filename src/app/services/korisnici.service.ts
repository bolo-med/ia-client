import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Korisnik } from '../models/Korisnik';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  serviceUrl: string = `${environment.apiUrl}/korisnici`;

  constructor(private http: HttpClient) {}

  public getKorisnikByID(id: number) {
    let korisnikovToken = window.localStorage.getItem('ia-token');
    return this.http.get<Korisnik>(`${this.serviceUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${korisnikovToken}`
      }
    });
  }

  public getKorisnikByUsername(username: string) {
    return this.http.get<OperationResponse>(`${this.serviceUrl}/username/${username}`);
  }

  public updateKorisnik(korisnik: Korisnik) {
    let tok = window.localStorage.getItem('ia-token');
    return this.http.put<OperationResponse>(`${this.serviceUrl}`, korisnik, {
      headers: {
        Authorization: `Bearer ${tok}`
      }
    });
  }

}

