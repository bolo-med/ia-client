import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Korisnik } from '../models/Korisnik';

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


}

