import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Status } from '../models/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusiService {

  serviceUrl = `${environment.apiUrl}/statusi`;

  constructor(private http: HttpClient) { }

  public getStatusi() {
    return this.http.get<Status[]>(this.serviceUrl);
  }

}

