import { Component, OnInit } from '@angular/core';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { RezervacijeService } from 'src/app/services/rezervacije.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aktuelno-usr',
  templateUrl: './aktuelno-usr.component.html',
  styleUrls: ['./aktuelno-usr.component.scss']
})
export class AktuelnoUsrComponent implements OnInit {

  rezervacijeSve: Rezervacija[];
  rezervacijeUserID: Rezervacija[];
  userID: number;

  apiUrl: string = environment.apiUrl;

  danDat: Date;

  constructor(private rezervacijeService: RezervacijeService, 
              private authService: AuthService) { }

  ngOnInit(): void {

    this.userID = this.getUserID();

    // Dodati provjeru, da li postoji token, i je li mu istekao rok trajanja /////////////////////////////////////////////////////////////
    this.rezervacijeService.getRezervacije().subscribe(data => {
      this.rezervacijeSve = data;
      this.rezervacijeUserID = this.rezervacijeUrerIdFn(this.rezervacijeSve);
    });

    this.danDat = new Date();

  }

  rezervacijeUrerIdFn(rezSve: Rezervacija[]): Rezervacija[] {
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

}

