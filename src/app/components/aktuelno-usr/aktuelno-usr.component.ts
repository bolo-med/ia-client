import { Component, OnInit } from '@angular/core';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { RezervacijeService } from 'src/app/services/rezervacije.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aktuelno-usr',
  templateUrl: './aktuelno-usr.component.html',
  styleUrls: ['./aktuelno-usr.component.scss']
})
export class AktuelnoUsrComponent implements OnInit {

  rezervacijeSve: Rezervacija[];
  rezervacijeUserID: Rezervacija[];
  rezervacijeUserIdAktivne: Rezervacija[];
  rezervacijeUserIdAktivneAbc: Rezervacija[];
  userID: number;

  apiUrl: string = environment.apiUrl;

  danDat: Date;

  constructor(private rezervacijeService: RezervacijeService, 
              private authService: AuthService, 
              private router: Router) { }

  ngOnInit(): void {

    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn()) {

      this.userID = this.getUserID();
      console.log(this.getUserID());
      

      this.rezervacijeService.getRezervacije().subscribe(data => {
        
        this.rezervacijeSve = data;
        this.rezervacijeUserID = this.rezervacijeUserIdFn(this.rezervacijeSve);
        this.rezervacijeUserIdAktivne = this.rezervacijeUserIdAktivneFn(this.rezervacijeUserID);
        this.rezervacijeUserIdAktivneAbc = this.rezervacijeUserIdAktivneAbcFn(this.rezervacijeUserIdAktivne);
        console.log(this.rezervacijeUserID);
        
      });
    }
    else {
      alert('Morate biti prijavljeni.');
      this.router.navigateByUrl('/');
    }

    this.danDat = new Date();

  }

  rezervacijeUserIdFn(rezSve: Rezervacija[]): Rezervacija[] {
    let rezUsrID: Rezervacija[] = [];
    for (let i: number = 0; i < rezSve.length; i++) {
      if (rezSve[i].korisnikID === this.userID) rezUsrID.push(rezSve[i]);
    }
    return rezUsrID;
  }

  getUserID(): number {
    let user = this.authService.getKorisnikDetails();
    return user.id;
  }

  kasnjenje(datumVracanja: Date): number {
    let danDatStr: string = this.danDat.toISOString().split('T')[0];
    this.danDat = new Date(danDatStr);
    let datVrac: Date = new Date(datumVracanja);
    let razlikaMilisec: number = this.danDat.valueOf() - datVrac.valueOf();
    let razlikaDani: number = (((razlikaMilisec/1000)/60)/60)/24;
    return razlikaDani;
  }

  rezervacijeUserIdAktivneFn(r: Rezervacija[]): Rezervacija[] {
    let rez: Rezervacija[] = [];
    for (let i = 0; i < r.length; i++) {
      if ((r[i].datumStvarnogVracanja === null) && (r[i].realizovana !== false)) rez.push(r[i]);
    }
    return rez;
  }

  rezervacijeUserIdAktivneAbcFn(r: Rezervacija[]): Rezervacija[] {
    let rAbc = r.sort((a, b) => {
      let datA: Date = new Date(a.datumPreuzimanja);
      let datB: Date = new Date(b.datumPreuzimanja);
      let datAStr: string = datA.toISOString().split('T')[0];
      let datBStr: string = datB.toISOString().split('T')[0];
      if (datAStr > datBStr) {
        return 1;
      }
      else if (datAStr < datBStr) {
        return -1;
      }
      else {
        return 0;
      }
    });
    return rAbc;
  }

}

