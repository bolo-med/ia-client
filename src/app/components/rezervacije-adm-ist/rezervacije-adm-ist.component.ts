import { Component, OnInit, Input } from '@angular/core';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { Korisnik } from 'src/app/models/Korisnik';

@Component({
  selector: 'app-rezervacije-adm-ist',
  templateUrl: './rezervacije-adm-ist.component.html',
  styleUrls: ['./rezervacije-adm-ist.component.scss']
})
export class RezervacijeAdmIstComponent implements OnInit {

  rezervacijeIstorija: Rezervacija[];
  rezervacijeIstorijaAbc: Rezervacija[];

  korisniciSviAbc: Korisnik[];

  @Input('rezervacijeSve')
  rezervacijeSve: Rezervacija[];

  @Input('korisniciSvi')
  korisniciSvi: Korisnik[];

  constructor() { }

  ngOnInit(): void {

    this.rezervacijeIstorija = this.rezIstFn(this.rezervacijeSve);
    this.rezervacijeIstorijaAbc = this.rezIstAbcFn(this.rezervacijeIstorija);

    this.korisniciSviAbc = this.korAbcFn(this.korisniciSvi);
    let kor: Korisnik = new Korisnik();
    kor.id = -1;
    kor.ime = 'korisnici';
    kor.prezime = 'Svi'
    this.korisniciSviAbc.unshift(kor);

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

}
