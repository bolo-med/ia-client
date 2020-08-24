import { Component, OnInit } from '@angular/core';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { environment } from 'src/environments/environment';
import { RezervacijeService } from 'src/app/services/rezervacije.service';
import { AuthService } from 'src/app/services/auth.service';
import { Korisnik } from 'src/app/models/Korisnik';

@Component({
  selector: 'app-istorija-usr',
  templateUrl: './istorija-usr.component.html',
  styleUrls: ['./istorija-usr.component.scss']
})
export class IstorijaUsrComponent implements OnInit {

  rezervacijeSve: Rezervacija[];
  rezervacijeUserID: Rezervacija[];
  rezervacijeUserIdIstorija: Rezervacija[];
  rezervacijeUserIdIstorijaAbc: Rezervacija[];
  userID: number;

  apiUrl: string = environment.apiUrl;

  constructor(private rezervacijeService: RezervacijeService, 
              private authService: AuthService) {}

  ngOnInit(): void {

    this.userID = this.getUserID();

    this.rezervacijeService.getRezervacije().subscribe(data => {
      this.rezervacijeSve = data;
      this.rezervacijeUserID = this.rezervacijeUserIdFn(this.rezervacijeSve);
      this.rezervacijeUserIdIstorija = this.rezervacijeUserIdIstorijaFn(this.rezervacijeUserID);
      this.rezervacijeUserIdIstorijaAbc = this.rezervacijeUserIdIstorijaAbcFn(this.rezervacijeUserIdIstorija);
    });
  }

  getUserID() {
    let user: Korisnik = this.authService.getKorisnikDetails();
    return user.id;
  }

  rezervacijeUserIdFn(rezSve: Rezervacija[]): Rezervacija[] {
    let rezUsrID: Rezervacija[] = [];
    for (let i: number = 0; i < rezSve.length; i++) {
      if (rezSve[i].korisnikID === this.userID) rezUsrID.push(rezSve[i]);
    }
    return rezUsrID;
  }

  rezervacijeUserIdIstorijaFn(r: Rezervacija[]): Rezervacija[] {
    let rez: Rezervacija[] = [];
    for (let i = 0; i < r.length; i++) {
      if ((r[i].datumStvarnogVracanja !== null) || (r[i].realizovana === false)) rez.push(r[i]);
    }
    return rez;
  }

  rezervacijeUserIdIstorijaAbcFn(r: Rezervacija[]): Rezervacija[] {
    let rAbc = r.sort((a, b) => {
      let datA: Date = new Date(a.datumStvarnogVracanja);
      let datB: Date = new Date(b.datumStvarnogVracanja);
      let datAStr: string = datA.toISOString().split('T')[0];
      let datBStr: string = datB.toISOString().split('T')[0];
      if (datAStr > datBStr) {
        return -1;
      }
      else if (datAStr < datBStr) {
        return 1;
      }
      else {
        return 0;
      }
    });
    return rAbc;
  }

  kasnjenje(datumVracanja: Date, datumStvarnogVracanja: Date): number {
    datumVracanja = new Date(datumVracanja);
    datumStvarnogVracanja = new Date(datumStvarnogVracanja);
    let razlikaMilisec: number = datumStvarnogVracanja.valueOf() - datumVracanja.valueOf();
    let razlikaDani: number = (((razlikaMilisec/1000)/60)/60)/24;
    return razlikaDani;
  }

}
