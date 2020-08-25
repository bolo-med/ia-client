import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Automobil } from './../models/Automobil';
import { environment } from 'src/environments/environment';
import { OperationResponse } from './../models/OperationResponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutomobiliService {

  serviceUrl = `${environment.apiUrl}/automobili`;

  constructor(private http: HttpClient) { }

  public getAutomobili() {
    return this.http.get<Automobil[]>(this.serviceUrl);
  }

  public getAutomobilByID(id: number) {
      let korisnikovToken = window.localStorage.getItem('ia-token');
      return this.http.get<Automobil>(`${this.serviceUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${korisnikovToken}`
        }
      });
  }

  public insertAutomobil(automobil: Automobil) {
    let tok = window.localStorage.getItem('ia-token');
    return this.http.post<OperationResponse>(this.serviceUrl, automobil, {
      headers: {
        Authorization: `Bearer ${tok}`
      }
    });
  }

  public deleteAutomobil(id: number) {
    let tok = window.localStorage.getItem('ia-token');
    return this.http.delete<OperationResponse>(`${this.serviceUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${tok}`
      }
    });
  }

  public updateAutomobil(automobil: Automobil) {
    let korisnikovToken = window.localStorage.getItem('ia-token');
    return this.http.put<OperationResponse>(this.serviceUrl, automobil, {
      headers: {
        Authorization: `Bearer ${korisnikovToken}`
      }
    });
  }

}

