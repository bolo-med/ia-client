import { Component, OnInit } from '@angular/core';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { RezervacijeService } from 'src/app/services/rezervacije.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/Korisnik';
import { KorisniciService } from 'src/app/services/korisnici.service';
import { Automobil } from 'src/app/models/Automobil';
import { AutomobiliService } from 'src/app/services/automobili.service';
import { race } from 'rxjs';

@Component({
  selector: 'app-rezervacije-adm',
  templateUrl: './rezervacije-adm.component.html',
  styleUrls: ['./rezervacije-adm.component.scss']
})
export class RezervacijeAdmComponent implements OnInit {

  odabrano: boolean;
  rezervacijeSve: Rezervacija[];
  //////////////////////////////////////////////////////////////////////////////////////////////////
  rezervacijeSveAbc: Rezervacija[];
  rezervacijeAbcAkt: Rezervacija[];
  rezervacijeAbcIst: Rezervacija[];
  //////////////////////////////////////////////////////////////////////////////////////////////////
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
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.rezervacijeSveAbc = this.rezervacijeSveAbcFn(this.rezervacijeSve);
        this.rezervacijeAbcAkt = this.rezervacijeAktFn(this.rezervacijeSveAbc);
        this.rezervacijeAbcIst = this.rezervacijeIstFn(this.rezervacijeSveAbc);
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  rezervacijeSveAbcFn(rSve: Rezervacija[]): Rezervacija[] {

    let rAbc: Rezervacija[] = rSve.sort((a ,b) => {

      let datA: Date = new Date(a.datumPreuzimanja);
      let datB: Date = new Date(b.datumPreuzimanja);
      let datAStr: string = datA.toISOString().split('T')[0];
      let datBStr: string = datB.toISOString().split('T')[0];

      let datA2: Date = new Date(a.datumVracanja);
      let datB2: Date = new Date(b.datumVracanja);
      let datAStr2: string = datA2.toISOString().split('T')[0];
      let datBStr2: string = datB2.toISOString().split('T')[0];

      if (datAStr < datBStr) {
        return -1;
      }
      else if (datAStr > datBStr) {
        return 1;
      }
      else {
        if (datAStr2 < datBStr2) {
          return -1;
        }
        else if (datAStr2 > datBStr2) {
          return 1;
        }
        else {
          return 0;
        }
      }
    });

    return rAbc;
  }

  rezervacijeAktFn(r: Rezervacija[]): Rezervacija[] {
    let rAkt: Rezervacija[] = [];
    for (let i = 0; i < r.length; i++) {
      if ((r[i].datumStvarnogVracanja === null) && (r[i].realizovana !== false)) {
        rAkt.push(r[i]);
      }
    }
    return rAkt;
  }

  rezervacijeIstFn(r: Rezervacija[]): Rezervacija[] {
    let rIst: Rezervacija[] = [];
    for (let i: number = 0; i < r.length; i++) {
      if ((r[i].datumStvarnogVracanja !== null) || (r[i].realizovana === false)) {
        rIst.push(r[i]);
      }
    }
    return rIst;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  kliknutoA() {
    this.odabrano = true;
  }

  kliknutoI() {
    this.odabrano = false;
  }

}
