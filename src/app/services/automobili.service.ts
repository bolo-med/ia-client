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

  constructor(private http: HttpClient, 
              private authService: AuthService) { }

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
    return this.http.post<OperationResponse>(this.serviceUrl, automobil);
  }

  public deleteAutomobil(id: number) {
    return this.http.delete<OperationResponse>(`${this.serviceUrl}/${id}`);
  }

  public updateAutomobil(automobil: Automobil) {
    return this.http.put<OperationResponse>(this.serviceUrl, automobil);
  }

}

