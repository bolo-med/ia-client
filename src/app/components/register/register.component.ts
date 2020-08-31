import { Component, OnInit } from '@angular/core';
import { Korisnik } from './../../models/Korisnik';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();
  godine: number[];

  imeV: boolean;
  preV: boolean;
  godV: boolean;
  adrV: boolean;
  telV: boolean;
  korV: boolean;
  lozV: boolean;

  imeRe: RegExp;
  preRe: RegExp;
  godRe: RegExp;
  adrRe: RegExp;
  telRe: RegExp;
  korRe: RegExp;
  lozRe: RegExp;

  greska: string;

  constructor(private authService: AuthService, 
              private router: Router) { }

  ngOnInit(): void {

    this.godineFn();

    this.imeV = false;
    this.preV = false;
    this.godV = false;
    this.adrV = false;
    this.telV = false;
    this.korV = false;
    this.lozV = false;

    this.imeRe = new RegExp('^[A-Z][a-z]+$');
    this.preRe = /^[A-Z][a-z]+$/;
    this.adrRe = /^[a-zA-Z0-9. ]+$/;
    this.telRe = /^[+][0-9]{11,12}$/;
    this.korRe = /^[0-9A-Za-z-]+$/;

    this.greska = '';
    
  }

  registruj() {
    if (this.korisnik.ime === undefined || 
        this.korisnik.ime.trim() === "" || 
        this.korisnik.prezime === undefined || 
        this.korisnik.prezime.trim() === "" || 
        this.korisnik.adresa === undefined || 
        this.korisnik.adresa.trim() === "" || 
        this.korisnik.telefon === undefined || 
        this.korisnik.telefon.trim() === "" || 
        this.korisnik.username === undefined || 
        this.korisnik.username.trim() === "" || 
        this.korisnik.password === undefined || 
        this.korisnik.password.trim() === "" || 
        this.korisnik.godRodjenja === undefined
    ) {
      alert("Morate ispuniti sva polja!");
    }
    else if (!this.korisnik.ime.match(this.imeRe)) {
      console.log('ime ' + this.korisnik.ime.match(this.imeRe));
      
      this.greska = 'Ime se sastoji samo od slova. Početno je veliko.';
      this.imeV = true;
      this.preV = false;
      this.adrV = false;
      this.telV = false;
      this.korV = false;
    }
    else if (!this.korisnik.prezime.match(this.imeRe)) {
      this.greska = 'Prezime se sastoji samo od slova. Početno je veliko.';
      this.imeV = false;
      this.preV = true;
      this.adrV = false;
      this.telV = false;
      this.korV = false;
    }
    else if (!this.korisnik.adresa.match(this.adrRe)) {
      this.greska = 'Adresa se može sastojati od slova, brojeva i tačaka.';
      this.imeV = false;
      this.preV = false;
      this.adrV = true;
      this.telV = false;
      this.korV = false;
    }
    else if (!this.korisnik.telefon.match(this.telRe)) {
      this.greska = 'Br. telefona je u obliku: +111223334445';
      this.imeV = false;
      this.preV = false;
      this.adrV = false;
      this.telV = true;
      this.korV = false;
    }
    else if (!this.korisnik.username.match(this.korRe)) {
      this.greska = 'Korisničko ime se može sastojati od slova, brojeva i znaka \"-\".';
      this.imeV = false;
      this.preV = false;
      this.adrV = false;
      this.telV = false;
      this.korV = true;
    }
    else {
      // if (confirm('Da li ste sigurni da želite da se REGISTRUJETE?')) {
      //   this.authService.register(this.korisnik).subscribe(data => {
      //     if (data.status === 0) {
      //       window.localStorage.setItem('ia-token', data.token);
      //       alert('Uspješna registracija!');
      //       this.router.navigateByUrl('/');
      //     }
      //     else {
      //       alert('Neuspješan pokušaj registrovanja!');
      //     }
      //   });
      // }
      console.log('aaa');//////////////////////////////////////////////////////////////////
      this.ngOnInit(); ////////////////////////////////////////////////////////////////////
    }
  }

  toNumber() {
    this.korisnik.godRodjenja = (+this.korisnik.godRodjenja);
  }

  godineFn() {
    this.godine = [];
    let tekucaGodina = +(new Date().toISOString().substring(0, 4));
    for (let i: number = tekucaGodina - 18; i >= (tekucaGodina - 118); i--) {
      this.godine.push(i);
    }
  }

}

