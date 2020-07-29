import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Automobil } from './../models/Automobil';
import { environment } from 'src/environments/environment';

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

}

