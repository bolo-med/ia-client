import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proizvodjac } from '../models/Proizvodjac';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class ProizvodjaciService {

  serviceUrl = `${environment.apiUrl}/proizvodjaci`;

  constructor(private http: HttpClient) { }

  public getProizvodjaci() {
    return this.http.get<Proizvodjac[]>(this.serviceUrl);
  }

  public insertProizvodjac(proizvodjac: Proizvodjac) {
    return this.http.post<OperationResponse>(this.serviceUrl, proizvodjac);
  }

  public deleteProizvodjac(id: number) {
    return this.http.delete<OperationResponse>(`${this.serviceUrl}/${id}`);
  }

  public updateProizvodjac(proizvodjac: Proizvodjac) {
    return this.http.put<OperationResponse>(this.serviceUrl, proizvodjac);
  }

}

