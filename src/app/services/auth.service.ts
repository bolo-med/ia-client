import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Korisnik } from '../models/Korisnik';
import { AuthenticationResponse } from './../models/AuthenticationResponse';
import { Router } from '@angular/router';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serviceUrl = environment.apiUrl; // http://localhost:3000

  constructor(private http: HttpClient, 
              private router: Router) { }

  register(korisnik: Korisnik) {
    return this.http.post<AuthenticationResponse>(`${this.serviceUrl}/register`, korisnik);
  }

  login(korisnik: Korisnik) {
    return this.http.post<AuthenticationResponse>(`${this.serviceUrl}/login`, korisnik);
  }

  logout() {
    window.localStorage.removeItem('ia-token');
    alert('Odjavili ste se!');
    this.router.navigateByUrl('/');
  }

  getKorisnikDetails() {
    let token = window.localStorage.getItem('ia-token');
    if (!token) return null;

    let userHash = token.split('.')[1];
    let userString = window.atob(userHash);
    return JSON.parse(userString);
  }

  isLoggedIn() {
    let korisnik = this.getKorisnikDetails();

    if (!korisnik) return false;

    return new Date(korisnik.expiry) > new Date();
  }

  checkPassword(korisnik: Korisnik) {
    let tok = window.localStorage.getItem('ia-token');
    return this.http.post<OperationResponse>(`${this.serviceUrl}/pass-usr`, korisnik, {
      headers: {
        Authorization: `Bearer ${tok}`
      }
    });
  }

}

