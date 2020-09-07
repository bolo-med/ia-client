import { Component, OnInit, Input } from '@angular/core';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { Korisnik } from 'src/app/models/Korisnik';
import { Automobil } from 'src/app/models/Automobil';

@Component({
  selector: 'app-rezervacije-adm-ist',
  templateUrl: './rezervacije-adm-ist.component.html',
  styleUrls: ['./rezervacije-adm-ist.component.scss']
})
export class RezervacijeAdmIstComponent implements OnInit {

  rezervacijeIstorija: Rezervacija[];
  rezervacijeIstorijaAbc: Rezervacija[];

  korisniciSviAbc: Korisnik[];
  korisnikID: number = -1; // Dobija vrijednost iz html-a.

  automobiliSviAbc: Automobil[];
  automobilID: number = -1;

  godineSve: number[];
  godinaID: number = -1;

  mjeseciSvi: any;
  mjesecID: number = -1;

  @Input('rezervacijeSve')
  rezervacijeSve: Rezervacija[];

  @Input('korisniciSvi')
  korisniciSvi: Korisnik[];

  @Input('automobiliSvi')
  automobiliSvi: Automobil[];

  constructor() { }

  ngOnInit(): void {

    this.rezervacijeIstorija = this.rezIstFn(this.rezervacijeSve);
    this.rezervacijeIstorijaAbc = this.rezIstAbcFn(this.rezervacijeIstorija);

    this.korisniciSviAbc = this.korAbcFn(this.korisniciSvi);

    this.automobiliSviAbc = this.autAbcFn(this.automobiliSvi);

    this.mjeseciSvi = {
      svi: {
        id: -1,
        naziv: 'Svi mjeseci'
      },
      jan: {
        id: 1,
        naziv: 'Januar'
      },
      feb: {
        id: 2,
        naziv: 'Februar'
      },
      mar: {
        id: 3,
        naziv: 'Mart'
      },
      apr: {
        id: 4,
        naziv: 'April'
      },
      maj: {
        id: 5,
        naziv: 'Maj'
      },
      jun: {
        id: 6,
        naziv: 'Jun'
      },
      jul: {
        id: 7,
        naziv: 'Jul'
      },
      avg: {
        id: 8,
        naziv: 'Avgust'
      },
      sep: {
        id: 9,
        naziv: 'Septembar'
      },
      okt: {
        id: 10,
        naziv: 'Oktobar'
      },
      nov: {
        id: 11,
        naziv: 'Novembar'
      },
      dec: {
        id: 12,
        naziv: 'Decembar'
      }
    };

  }

  rezIstFn(rSve: Rezervacija[]): Rezervacija[] {
    let rIst: Rezervacija[] = [];
    for (let i: number = 0; i < rSve.length; i++) {
      if ((rSve[i].datumStvarnogVracanja !== null) || (rSve[i].realizovana === false)) {
        rIst.push(rSve[i]);
      }
    }
    return rIst;
  }

  rezIstAbcFn(rezIst: Rezervacija[]): Rezervacija[] {

    let rezIstAbc: Rezervacija[] = [];

    rezIstAbc = rezIst.sort((a, b) => {

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

    return rezIstAbc;

  }

  autAbcFn(aSvi: Automobil[]): Automobil[] {
    let aAbc: Automobil[] = [];
    aAbc = aSvi.sort((a, b) => {
      let aNaziv: string = a.proizvodjac.naziv.toLowerCase();
      let bNaziv: string = b.proizvodjac.naziv.toLowerCase();
      let aModel: string = a.model.oznaka.toLowerCase();
      let bModel: string = b.model.oznaka.toLowerCase();
      if (aNaziv < bNaziv) {
        return -1;
      }
      else if (aNaziv > bNaziv) {
        return 1;
      }
      else {
        if (aModel < bModel) {
          return -1;
        }
        else if (aModel > bModel) {
          return 1;
        }
        else {
          return 0;
        }
      }
    });
    return aAbc;
  }

  kasnjenje(vracanje: Date, vratio: Date): number {
    vracanje = new Date(vracanje);
    vratio = new Date(vratio);
    let razlikaMilisec: number = vratio.valueOf() - vracanje.valueOf();
    return (((razlikaMilisec / 1000) / 60) / 60) / 24;
  }

  korAbcFn(kor: Korisnik[]): Korisnik[] {
    let korAbc: Korisnik[] = [];
    korAbc = kor.sort((a, b) => {
      let aPrez: string = a.prezime;
      let bPrez: string = b.prezime;
      if (aPrez < bPrez) {
        return -1;
      }
      else if (aPrez > bPrez) {
        return 1;
      }
      else {
        return 0;
      }
    });
    return korAbc;
  }

  pretraga(): void {

    this.ngOnInit();

    if ((+this.korisnikID !== -1) && (+this.automobilID === -1)) {
      this.rezervacijePoKorisniku();
    }
    else if ((+this.korisnikID === -1) && (+this.automobilID !== -1)) {
      this.rezervacijePoAutomobilu();
    }
    else if ((+this.korisnikID !== -1) && (+this.automobilID !== -1)) {
      this.rezervacijePoKorisniku();
      this.rezervacijePoAutomobilu();
    }
    
  }

  rezervacijePoKorisniku() {
    let r: Rezervacija[] = [];
      for (let i: number = 0; i < this.rezervacijeIstorijaAbc.length; i++) {
        if (this.rezervacijeIstorijaAbc[i].korisnikID === (+this.korisnikID)) {
          r.push(this.rezervacijeIstorijaAbc[i]);
        }
      }
      this.rezervacijeIstorijaAbc = r;
  }

  rezervacijePoAutomobilu() {
    let r: Rezervacija[] = [];
      for (let i: number = 0; i < this.rezervacijeIstorijaAbc.length; i++) {
        if (this.rezervacijeIstorijaAbc[i].automobilID === (+this.automobilID)) {
          r.push(this.rezervacijeIstorijaAbc[i]);
        }
      }
      this.rezervacijeIstorijaAbc = r;
  }

}
