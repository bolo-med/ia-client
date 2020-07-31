import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Automobil } from './../models/Automobil';
import { environment } from 'src/environments/environment';
import { OperationResponse } from './../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class AutomobiliService {

  serviceUrl = `${environment.apiUrl}/automobili`;

  constructor(private http: HttpClient) { }

  public getAutomobili() {
    return this.http.get<Automobil[]>(this.serviceUrl);
  }

  // public getAutomobil(id: number) {
  //   return this.http.get<Automobil>(`${this.serviceUrl}/${id}`);
  // }

  public insertAutomobil(automobil: Automobil) {
    return this.http.post<OperationResponse>(this.serviceUrl, automobil);
  }

  public deleteAutomobil(id: number) {
    return this.http.delete<OperationResponse>(`${this.serviceUrl}/${id}`);
  }

}

