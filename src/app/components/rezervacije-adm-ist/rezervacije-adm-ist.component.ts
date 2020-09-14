import { Component, OnInit, Input, Host } from '@angular/core';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { Korisnik } from 'src/app/models/Korisnik';
import { Automobil } from 'src/app/models/Automobil';
import { AuthService } from 'src/app/services/auth.service';
import { RezervacijeService } from 'src/app/services/rezervacije.service';
import { Router } from '@angular/router';
import { RezervacijeAdmComponent } from '../rezervacije-adm/rezervacije-adm.component';

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

  godineSve: any[];
  godinaID: number = -1;

  mjeseciSvi: any[];
  mjesecID: number = -1;

  rezervacijaOdabrana: Rezervacija;
  vidljivo: boolean;

  @Input('rezervacijeSve')
  rezervacijeSve: Rezervacija[];

  @Input('korisniciSvi')
  korisniciSvi: Korisnik[];

  @Input('automobiliSvi')
  automobiliSvi: Automobil[];

  constructor(private authService: AuthService, 
              private rezervacijeService: RezervacijeService, 
              private router: Router, 
              @Host() private parent: RezervacijeAdmComponent) { }

  ngOnInit(): void {

    this.rezervacijeIstorija = this.rezIstFn(this.rezervacijeSve);
    this.rezervacijeIstorijaAbc = this.rezIstAbcFn(this.rezervacijeIstorija);

    this.korisniciSviAbc = this.korAbcFn(this.korisniciSvi);

    this.automobiliSviAbc = this.autAbcFn(this.automobiliSvi);

    this.mjeseciSvi = this.sviMjeseciFn();

    this.godineSve = this.godineSveFn(this.rezervacijeIstorijaAbc);

    this.rezervacijaOdabrana = new Rezervacija();

    this.vidljivo = false;
      
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
        return 1;
      }
      else if (datAStr > datBStr) {
        return -1;
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

    if ((+this.korisnikID !== -1) && (+this.automobilID === -1) && (+this.godinaID === -1) && (+this.mjesecID === -1)) {
      this.rezervacijePoKorisniku();
    }
    else if ((+this.korisnikID === -1) && (+this.automobilID !== -1) && (+this.godinaID === -1)  && (+this.mjesecID === -1)) {
      this.rezervacijePoAutomobilu();
    }
    else if ((+this.korisnikID !== -1) && (+this.automobilID !== -1) && (+this.godinaID === -1)  && (+this.mjesecID === -1)) {
      this.rezervacijePoKorisniku();
      this.rezervacijePoAutomobilu();
    }
    else if ((+this.korisnikID === -1) && (+this.automobilID === -1) && (+this.godinaID === -1) && (+this.mjesecID !== -1)) {
      this.rezervacijePoMjesecu();
    }
    else if ((+this.korisnikID === -1) && (+this.automobilID !== -1) && (+this.godinaID === -1) && (+this.mjesecID !== -1)) {
      this.rezervacijePoAutomobilu();
      this.rezervacijePoMjesecu();
    }
    else if ((+this.korisnikID !== -1) && (+this.automobilID !== -1) && (+this.godinaID === -1) && (+this.mjesecID !== -1)) {
      this.rezervacijePoKorisniku();
      this.rezervacijePoAutomobilu();
      this.rezervacijePoMjesecu();
    }
    else if ((+this.korisnikID === -1) && (+this.automobilID === -1) && (+this.godinaID !== -1) && (+this.mjesecID === -1)) {
      this.rezervacijePoGodini();
    }
    else if ((+this.korisnikID !== -1) && (+this.automobilID === -1) && (+this.godinaID !== -1) && (+this.mjesecID === -1)) {
      this.rezervacijePoKorisniku();
      this.rezervacijePoGodini();
    }
    else if ((+this.korisnikID !== -1) && (+this.automobilID !== -1) && (+this.godinaID !== -1) && (+this.mjesecID === -1)) {
      this.rezervacijePoKorisniku();
      this.rezervacijePoAutomobilu();
      this.rezervacijePoGodini();
    }
    else if ((+this.korisnikID !== -1) && (+this.automobilID !== -1) && (+this.godinaID !== -1) && (+this.mjesecID !== -1)) {
      this.rezervacijePoKorisniku();
      this.rezervacijePoAutomobilu();
      this.rezervacijePoGodini();
      this.rezervacijePoMjesecu();
    }
    else if ((+this.korisnikID === -1) && (+this.automobilID !== -1) && (+this.godinaID !== -1) && (+this.mjesecID !== -1)) {
      this.rezervacijePoAutomobilu();
      this.rezervacijePoGodini();
      this.rezervacijePoMjesecu();
    }
    else if ((+this.korisnikID === -1) && (+this.automobilID !== -1) && (+this.godinaID !== -1) && (+this.mjesecID === -1)) {
      this.rezervacijePoAutomobilu();
      this.rezervacijePoGodini();
    }
    else if ((+this.korisnikID === -1) && (+this.automobilID === -1) && (+this.godinaID !== -1) && (+this.mjesecID !== -1)) {
      this.rezervacijePoGodini();
      this.rezervacijePoMjesecu();
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

  rezervacijePoMjesecu() {
    let r: Rezervacija[] = [];
    for (let i: number = 0; i < this.rezervacijeIstorijaAbc.length; i++) {
      let d: Date = new Date(this.rezervacijeIstorijaAbc[i].datumPreuzimanja);
      let m: number = d.getMonth() + 1;
      if (m === (+this.mjesecID)) {
        r.push(this.rezervacijeIstorijaAbc[i]);
      }
    }
    this.rezervacijeIstorijaAbc = r;
  }

  rezervacijePoGodini() {
    let r: Rezervacija[] = [];
    for (let i: number = 0; i < this.rezervacijeIstorijaAbc.length; i++) {
      let dat: Date = new Date(this.rezervacijeIstorijaAbc[i].datumPreuzimanja);
      let god: number = dat.getFullYear();
      if (god === (+this.godinaID)) {
        r.push(this.rezervacijeIstorijaAbc[i]);
      }
    }
    this.rezervacijeIstorijaAbc = r;
  }

  sviMjeseciFn(): any {
    let arr1: any[] = [];
    arr1.push({id: 1, naziv: 'Januar'});
    arr1.push({id: 2, naziv: 'Februar'});
    arr1.push({id: 3, naziv: 'Mart'});
    arr1.push({id: 4, naziv: 'April'});
    arr1.push({id: 5, naziv: 'Maj'});
    arr1.push({id: 6, naziv: 'Jun'});
    arr1.push({id: 7, naziv: 'Jul'});
    arr1.push({id: 8, naziv: 'Avgust'});
    arr1.push({id: 9, naziv: 'Septembar'});
    arr1.push({id: 10, naziv: 'Oktobar'});
    arr1.push({id: 11, naziv: 'Novembar'});
    arr1.push({id: 12, naziv: 'Decembar'});
    return arr1;
  }

  godineSveFn(r: Rezervacija[]): any[] {

    let gObjekat: any[] = [];
    let gBroj: number[] = [];

    for (let i:number = 0; i < r.length; i++) {
      let dat: Date = new Date(r[i].datumPreuzimanja);
      let god: number = dat.getFullYear();
      gBroj.push(god);
    }
    
    gBroj = gBroj.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    for (let i: number = 0; i < gBroj.length; i++) {
      gObjekat.push({id: gBroj[i], godina: (gBroj[i] + ".")});
    }
    
    return gObjekat;
  }

  detaljnije(r: Rezervacija): void {
    this.rezervacijeIstorijaAbc = [];
    this.rezervacijeIstorijaAbc.push(r);
    this.rezervacijaOdabrana = r;
    this.vidljivo = true;
  }

  nazad(): void {
    this.ngOnInit();
  }

  ukloni() {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      this.rezervacijeService.deleteRezervacija(this.rezervacijaOdabrana.id).subscribe(data => {
        if (data.status === 0) {
          //////////////////////////////////////////////////////////////////////////////
          if (this.pozoviRoditeljskiNgOnInit() === true) {
            this.parent.odabrano = false; // Posle ovog se zavrsi parent.ngOnInit, pa se vrijednost postavi na true.
            alert('Rezervacija je uklonjena!');
          }
          /////////////////////////////////////////////////////////////////////////////
          // this.ngOnInit();
          // alert("Rezervacija je uklonjena!");
        }
        else {
          alert('Greska pri uklanjanju rezervacije!');
        }
        // this.parent.odabrano = false; // I ovo se izvrsava prije parent.ngOnInit
      });
    }
    else {
      alert('Nemate administratorska prava!');
      this.router.navigateByUrl('/');
    }
  }

  // Ipak vraca true, prije nego sto se zavrsi izvrsavanje parent.ngOnInita.
  pozoviRoditeljskiNgOnInit(): boolean {
    this.parent.ngOnInit();
    return true;
  }

}
