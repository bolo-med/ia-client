import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/Korisnik';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { KorisniciService } from 'src/app/services/korisnici.service';

@Component({
  selector: 'app-podaci-usr',
  templateUrl: './podaci-usr.component.html',
  styleUrls: ['./podaci-usr.component.scss']
})
export class PodaciUsrComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();
  godine: number[];

  imeV: boolean;
  preV: boolean;
  godV: boolean;
  adrV: boolean;
  telV: boolean;

  imeRe: RegExp;
  preRe: RegExp;
  godRe: RegExp;
  adrRe: RegExp;
  telRe: RegExp;

  greska: string;

  v2: boolean;
  usrInf: string;

  constructor(private authService: AuthService, 
              private router: Router, 
              private korisniciService: KorisniciService) { }

  ngOnInit(): void {

    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn()) {
      this.korisniciService.getKorisnikByID(this.authService.getKorisnikDetails().id).subscribe(data => {
        this.korisnik = data;
      });
    }
    else {
      alert('Morate biti prijavljeni!');
      this.router.navigateByUrl('/');
    }

    this.godineFn();

    this.imeV = false;
    this.preV = false;
    this.godV = false;
    this.adrV = false;
    this.telV = false;

    this.imeRe = new RegExp('^[A-Z][a-z]+$');
    this.preRe = /^[A-Z][a-z]+$/;
    this.adrRe = /^[a-zA-Z0-9. ]+$/;
    this.telRe = /^[+][0-9]{11,12}$/;

    this.greska = '';

    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn()) {
      this.v2 = true;
      this.usrInf = 'Ulogovani ste kao: ' + this.authService.getKorisnikDetails().username;
    }

  }

  izmijeni() {

    if (this.korisnik.ime === undefined || 
        this.korisnik.ime.trim() === "" || 
        this.korisnik.prezime === undefined || 
        this.korisnik.prezime.trim() === "" || 
        this.korisnik.adresa === undefined || 
        this.korisnik.adresa.trim() === "" || 
        this.korisnik.telefon === undefined || 
        this.korisnik.telefon.trim() === "" || 
        this.korisnik.godRodjenja === undefined
    ) {
      alert("Morate ispuniti sva polja!");
    }
    else if (!this.korisnik.ime.match(this.imeRe)) {
      
      this.greska = 'Ime se sastoji samo od slova. Početno je veliko.';
      this.imeV = true;
      this.preV = false;
      this.adrV = false;
      this.telV = false;
    }
    else if (!this.korisnik.prezime.match(this.imeRe)) {
      this.greska = 'Prezime se sastoji samo od slova. Početno je veliko.';
      this.imeV = false;
      this.preV = true;
      this.adrV = false;
      this.telV = false;
    }
    else if (!this.korisnik.adresa.match(this.adrRe)) {
      this.greska = 'Adresa se može sastojati od slova, brojeva i tačaka.';
      this.imeV = false;
      this.preV = false;
      this.adrV = true;
      this.telV = false;
    }
    else if (!this.korisnik.telefon.match(this.telRe)) {
      this.greska = 'Br. telefona je u obliku: +111223334445';
      this.imeV = false;
      this.preV = false;
      this.adrV = false;
      this.telV = true;
    }
    else {
      if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn()) {
        this.korisniciService.updateKorisnik(this.korisnik).subscribe(data => {
          if (data.status === 0) {
            alert('Korisnicki podaci su izmijenjeni!');
            this.router.navigateByUrl('/aktuelno-usr');
          }
          else {
            alert('Greska pri izmjeni korisnickih podataka!');
          }
        });
      }
      else {
        alert('Niste prijavljeni!');
        this.router.navigateByUrl('/');
      }
    }
  }

  toNumber() {
    this.korisnik.godRodjenja = (+this.korisnik.godRodjenja);
  }

  godineFn() {
    this.godine = [];
    let tekucaGodina = +(new Date().toISOString().substring(0, 4));
    for (let i: number = tekucaGodina - 18; i >= (tekucaGodina - 95); i--) {
      this.godine.push(i);
    }
  }

}
