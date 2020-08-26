import { Component, OnInit, Input } from '@angular/core';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rezervacije-adm-akt',
  templateUrl: './rezervacije-adm-akt.component.html',
  styleUrls: ['./rezervacije-adm-akt.component.scss']
})
export class RezervacijeAdmAktComponent implements OnInit {

  rezervacijeAktuelne: Rezervacija[];
  rezervacijeAktuelneAbc: Rezervacija[];

  apiUrl: string = environment.apiUrl;
  rezervacijaOdabrana: Rezervacija;
  vidljivo: boolean;

  @Input('rezervacijeSve')
  rezervacijeSve: Rezervacija[];

  constructor() { }

  ngOnInit(): void {

    this.vidljivo = false;

    this.rezervacijeAktuelne = this.rezervacijeAktuelneFn();
    this.rezervacijeAktuelneAbc = this.rezervacijeAktuelneAbcFn();
    
    this.rezervacijaOdabrana = this.rezervacijeAktuelneAbc[0];

  }

  rezervacijeAktuelneFn(): Rezervacija[] {
    let r: Rezervacija[] = this.rezervacijeSve;
    let rAkt: Rezervacija[] = [];
    for (let i = 0; i < this.rezervacijeSve.length; i++) {
      if ((r[i].datumStvarnogVracanja === null) && !(r[i].realizovana === false)) {
        rAkt.push(r[i]);
      }
    }
    return rAkt;
  }

  rezervacijeAktuelneAbcFn(): Rezervacija[] {
    let r: Rezervacija[] = this.rezervacijeAktuelne;
    let rAbc: Rezervacija[] = [];
    rAbc = r.sort((a, b) => {
      let datA: Date = new Date(a.datumPreuzimanja);
      let datB: Date = new Date(b.datumPreuzimanja);
      let datAStr: string = datA.toISOString().split('T')[0];
      let datBStr: string = datB.toISOString().split('T')[0];
      if (datAStr < datBStr) {
        return -1;
      }
      else if (datAStr > datBStr) {
        return 1;
      }
      else {
        return 0;
      }
    });
    return rAbc;
  }

  kasnjenje(vracanje: Date): number {
    let danas: Date = new Date();
    let danasStr: string = danas.toISOString().split('T')[0];
    danas = new Date(danasStr);
    let vr: Date = new Date(vracanje);
    let razlikaMilisec: number = danas.valueOf() - vr.valueOf();
    return (((razlikaMilisec / 1000) / 60) / 60) / 24;
  }

  detaljnije(r: Rezervacija): void {
    this.rezervacijeAktuelneAbc = [];
    this.rezervacijeAktuelneAbc.push(r);
    this.rezervacijaOdabrana = r;
    this.vidljivo = true;
  }

  nazad(): void {
    this.ngOnInit();
  }

}
