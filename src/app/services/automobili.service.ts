import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Automobil } from './../models/Automobil';

@Injectable({
  providedIn: 'root'
})
export class AutomobiliService {

  constructor(private http: HttpClient) { }

  public getAutomobili() {
    return this.http.get<Automobil[]>('http://localhost:3000/automobili');
  }

}
