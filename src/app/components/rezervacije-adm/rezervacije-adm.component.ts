import { Component, OnInit } from '@angular/core';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { RezervacijeService } from 'src/app/services/rezervacije.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/Korisnik';
import { KorisniciService } from 'src/app/services/korisnici.service';
import { Automobil } from 'src/app/models/Automobil';
import { AutomobiliService } from 'src/app/services/automobili.service';

@Component({
  selector: 'app-rezervacije-adm',
  templateUrl: './rezervacije-adm.component.html',
  styleUrls: ['./rezervacije-adm.component.scss']
})
export class RezervacijeAdmComponent implements OnInit {

  odabrano: boolean;
  rezervacijeSve: Rezervacija[];
  korisniciSvi: Korisnik[];
  automobiliSvi: Automobil[];

  constructor(private rezervacijeService: RezervacijeService, 
              private authService: AuthService, 
              private router: Router, 
              private korisniciService: KorisniciService, 
              private automobiliService: AutomobiliService) { }

  ngOnInit(): void {

    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() 
                                                && (this.authService.getKorisnikDetails().isAdmin === 1)) {

      this.rezervacijeService.getRezervacije().subscribe(data => {
        this.rezervacijeSve = data;
        this.odabrano = true;
      });

      this.korisniciService.getKorisnici().subscribe(data => {
        this.korisniciSvi = data;
      });

      this.automobiliService.getAutomobili().subscribe(data => {
        this.automobiliSvi = data;
      });
    }
    else {
      alert('Nemate administratorska prava!');
      this.router.navigateByUrl('/');
    }

  }

  kliknutoA() {
    this.odabrano = true;
  }

  kliknutoI() {
    this.odabrano = false;
  }

}
