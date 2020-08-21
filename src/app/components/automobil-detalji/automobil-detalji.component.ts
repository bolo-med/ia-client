import { Component, OnInit, Host, Input } from '@angular/core';
import { AutomobiliComponent } from '../automobili/automobili.component';
import { Automobil } from 'src/app/models/Automobil';
import { environment } from 'src/environments/environment';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { RezervacijeService } from './../../services/rezervacije.service';

@Component({
  selector: 'app-automobil-detalji',
  templateUrl: './automobil-detalji.component.html',
  styleUrls: ['./automobil-detalji.component.scss']
})
export class AutomobilDetaljiComponent implements OnInit {

  apiUrl = environment.apiUrl;
  rezervacija: Rezervacija = new Rezervacija();
  danasnjiDatum: Date = new Date();

  preuzimanjeAlert: boolean;
  vracanjeAlert: boolean;
  razlikaAlert: boolean;
  proslostAlert: boolean;
  periodAlert: boolean;

  brDana:number;
  cijenaRez: number;
  cijenaIzn: number;

  @Input('odabraniAutomobil')
  odabraniAutomobil: Automobil;

  @Input('rezervacijeAutomobilID')
  rezervacijeAutomobilID: Rezervacija[];

  constructor(@Host() private parent: AutomobiliComponent, 
              private rezervacijeService: RezervacijeService) {
    this.preuzimanjeAlert = false;
    this.vracanjeAlert = false;
    this.razlikaAlert = false;
    this.proslostAlert = false;
    this.periodAlert = false;
    this.brDana = 0;
    this.cijenaRez = 0;
    this.cijenaIzn = 0;
  }

  ngOnInit(): void {}

  odustani() {
    this.parent.ngOnInit();
  }

  rezervisi() {
    if (this.rezervacija.datumPreuzimanja && this.rezervacija.datumVracanja) {

      this.rezervacija.korisnikID = this.getUserID();
      this.rezervacija.automobilID = this.odabraniAutomobil.id;
      this.rezervacija.realizovana = null;
      this.rezervacija.datumStvarnogVracanja = null;

      this.rezervacijeService.insertRezervacija(this.rezervacija).subscribe(data => {
        if (data.status === 0) {
          alert('Rezervisali ste automobil!');
          this.parent.ngOnInit();
        }
        else {
          alert('Greska pri rezervisanju automobila!');
        }
      });
    }
    else {
      if (!this.rezervacija.datumPreuzimanja) {
        this.preuzimanjeAlert = true;
      }
      if (!this.rezervacija.datumVracanja) {
        this.vracanjeAlert = true;
      }
    }
  }

  promjena() {
    if (this.rezervacija.datumPreuzimanja) {
      this.preuzimanjeAlert = false;
    }
    if (this.rezervacija.datumVracanja) {
      this.vracanjeAlert = false;
    }

    if (this.rezervacija.datumPreuzimanja && this.rezervacija.datumVracanja) {
      let danasStr: string = this.danasnjiDatum.toISOString().split('T')[0];
      let preuzStr: string = new Date(this.rezervacija.datumPreuzimanja).toISOString().split('T')[0];
      let vracStr: string = new Date(this.rezervacija.datumVracanja).toISOString().split('T')[0];

      if (danasStr > preuzStr) {
        this.proslostAlert = true;
        this.periodAlert = false;
        this.cijeneNa0();
      }
      else {
        if (preuzStr > vracStr) {
          this.razlikaAlert = true;
          this.proslostAlert = false;
          this.periodAlert = false;
          this.cijeneNa0();
        }
        else {
          this.razlikaAlert = false;
          this.proslostAlert = false;

          // Preklapa li se period rezervacije sa nekim postojecim
          if (this.unutarPerioda(this.rezervacijeAutomobilID)) {
            this.periodAlert = true;
            this.cijeneNa0();
          }
          else {
            this.periodAlert = false;
            this.cijene(preuzStr, vracStr);
          }
        }
      }
    }
  }

  cijene(pr: string, vr: string): void {
    let preuzimanje: Date = new Date(pr);
    let vracanje: Date = new Date(vr);
    let razlika: number = vracanje.valueOf() - preuzimanje.valueOf();
    this.brDana = (((razlika/1000)/60)/60)/24 + 1;
    this.cijenaRez = this.brDana/2 * this.odabraniAutomobil.cijena;
    this.cijenaIzn = this.brDana * this.odabraniAutomobil.cijena;
  }

  cijeneNa0() {
    this.brDana = 0;
    this.cijenaRez = 0;
    this.cijenaIzn = 0;
  }

  getUserID(): number {
    let token = window.localStorage.getItem('ia-token');
    let userHash = token.split('.')[1];
    let userString = window.atob(userHash);
    let user = JSON.parse(userString);
    return user.id;
  }

  unutarPerioda(rez: Rezervacija[]): boolean {
    let preuzStr: string = new Date(this.rezervacija.datumPreuzimanja).toISOString().split('T')[0];
    let vracStr: string = new Date(this.rezervacija.datumVracanja).toISOString().split('T')[0];
    for (let i: number = 0; i < rez.length; i++) {
      let preuzStrR: string = new Date(rez[i].datumPreuzimanja).toISOString().split('T')[0];
      let vracStrR: string = new Date(rez[i].datumVracanja).toISOString().split('T')[0];
      // Preklapa li se odabrani period sa nekim od postojecih
      if ((preuzStr >= preuzStrR) && (preuzStr <= vracStrR)) return true;
      if ((vracStr >= preuzStrR) && (vracStr <= vracStrR)) return true;
      // Obuhvata li period neki od postojecih
      if ((preuzStrR >= preuzStr) && (preuzStrR <= vracStr)) return true;
    }
    // Ako je odabran ispravan period
    return false;
  }

}
