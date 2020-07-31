import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Model } from '../models/Model';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class ModeliService {

  serviceUrl = `${environment.apiUrl}/modeli`;

  constructor(private http: HttpClient) { }

  public getModeli() {
    return this.http.get<Model[]>(this.serviceUrl);
  }

  public insertModel(model: Model) {
    return this.http.post<OperationResponse>(this.serviceUrl, model);
  }

}

