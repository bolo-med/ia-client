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

  rokPreuzimanja(preuzimanje: Date, vracanje: Date): Date {
    let pr: Date = new Date(preuzimanje);
    let vr: Date = new Date(vracanje);
    let razlMs: number = vr.valueOf() - pr.valueOf();
    let razlD: number = (((razlMs/1000)/60)/60)/24;
    if (razlD < 2) {
      return pr;
    }
    else {
      let brDana: number = Math.ceil(razlD/2);
      let rok: Date = new Date(pr.valueOf() + (((brDana*24)*60)*60)*1000);

      // console.log('abc'); // PROBLEM: Za svaki poziv, f-ja se izvrsi 14 puta, umjesto jednom! ///////////////////////////////////////////////////
      
      return rok;
    }
  }

  razlikaRok(preuzimanje: Date, vracanje: Date): number {
    let rok: Date = this.rokPreuzimanja(preuzimanje, vracanje);
    let danas: Date = new Date();
    let preuz: Date = new Date(preuzimanje);

    let rokStr: string = rok.toISOString().split('T')[0];
    let danasStr: string = danas.toISOString().split('T')[0];
    let preuzStr: string = preuz.toISOString().split('T')[0];

    // console.log('danas: ' + danasStr);
    // console.log('preuzimanje: ' + preuzStr);
    // console.log('krajnji rok: ' + rokStr);

    if (danasStr < preuzStr) {
      return -1;
    }
    else if ((danasStr >= preuzStr) && (danasStr <= rokStr)) {
      return 0;
    }
    else if (danasStr > rokStr) {
      return 1;
    }
  }

}
