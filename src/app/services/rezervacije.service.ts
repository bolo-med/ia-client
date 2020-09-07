import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rezervacija } from '../models/Rezervacija';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class RezervacijeService {

  serviceUrl = `${environment.apiUrl}/rezervacije`;

  constructor(private http: HttpClient) { }

  public getRezervacije() {
    let korisnikovToken = window.localStorage.getItem('ia-token');
    return this.http.get<Rezervacija[]>(this.serviceUrl, {
      headers: {
        Authorization: `Bearer ${korisnikovToken}`
      }
    });
  }

  public insertRezervacija(rezervacija: Rezervacija) {
    let korisnikovToken = window.localStorage.getItem('ia-token');
    return this.http.post<OperationResponse>(this.serviceUrl, rezervacija, {
      headers: {
        Authorization: `Bearer ${korisnikovToken}`
      }
    });
  }

  public updateRezervacija(rezervacija: Rezervacija) {
    let token = window.localStorage.getItem('ia-token');
    return this.http.put<OperationResponse>(this.serviceUrl, rezervacija, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  public deleteRezervacija(id: number) {
    let token = window.localStorage.getItem('ia-token');
    return this.http.delete<OperationResponse>(`${this.serviceUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
