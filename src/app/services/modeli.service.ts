import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Model } from '../models/Model';

@Injectable({
  providedIn: 'root'
})
export class ModeliService {

  serviceUrl = `${environment.apiUrl}/modeli`;

  constructor(private http: HttpClient) { }

  public getModeli() {
    return this.http.get<Model[]>(this.serviceUrl);
  }

}

