import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/Korisnik';
import { KorisniciService } from './../../services/korisnici.service'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lozinka-usr',
  templateUrl: './lozinka-usr.component.html',
  styleUrls: ['./lozinka-usr.component.scss']
})
export class LozinkaUsrComponent implements OnInit {

  korisnik: Korisnik;
  korisnikID: number;

  lozTrenutna: string;
  lozNova: string;
  lozNovaP: string;

  greska: boolean;
  greska2: boolean;
  greska2Str: string;

  constructor(private korisniciServices: KorisniciService, 
              private authService: AuthService, 
              private router: Router) {}

  ngOnInit(): void {

    this.lozTrenutna = '';
    this.lozNova = '';
    this.lozNovaP = '';

    this.greska = false;
    this.greska2 = false;

    let k: Korisnik = this.authService.getKorisnikDetails();
    this.korisnikID = k.id;
    this.korisniciServices.getKorisnikByID(this.korisnikID).subscribe(data => {
    this.korisnik = data;
      
    });
  }

  promijeni() {

    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn()) {
      let kor: Korisnik = new Korisnik();
      kor.id = this.authService.getKorisnikDetails().id;
      kor.password = this.lozTrenutna;
      this.authService.checkPassword(kor).subscribe(data => {
        if (data.status === 1) {
          this.greska = true;
        }
        else if (data.status === 0) {
          this.greska = false;
          if (this.lozNova !== this.lozNovaP) {
            this.greska2Str = 'Lozinke nisu iste!';
            this.greska2 = true;
          }
          else if (this.lozNova.length < 1) {
            this.greska2Str = 'Lozinka ne može biti prazna!';
            this.greska2 = true;
          }
          else {
            this.greska2 = false;
            kor.password = this.lozNova;
            this.korisniciServices.updateKorisnik(kor).subscribe(data => {
              if (data.status === 0) {
                alert('Lozinka je promijenjena!');
                this.router.navigateByUrl('/');
              }
              else {
                alert('Došlo je go greške pri promjeni lozinke!');
              }
            });

          }
        }
        else {
          console.log('Greska pri provjeri lozinke!');
        }
      });
    }
    else {
      alert('Morate biti prijavljeni!');
    }

  }

}
