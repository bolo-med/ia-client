import { Component, OnInit } from '@angular/core';
import { Proizvodjac } from 'src/app/models/Proizvodjac';
import { ProizvodjaciService } from './../../services/proizvodjaci.service';
import { ModeliService } from './../../services/modeli.service';
import { StatusiService } from './../../services/statusi.service';
import { Model } from 'src/app/models/Model';
import { Status } from 'src/app/models/Status';
import { Automobil } from 'src/app/models/Automobil';
import { AutomobiliService } from 'src/app/services/automobili.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-automobili-adm',
  templateUrl: './automobili-adm.component.html',
  styleUrls: ['./automobili-adm.component.scss']
})
export class AutomobiliAdmComponent implements OnInit {

  odabranUnos: boolean = true; // Odabrano radio-dugme 'Dodaj automobil, proizvodjaca, model i/ili status'
  odabranUnosA: boolean = true; // Vidljiva komponenta: automobil-obrazac-adm
  odabranUnosPrMoSt: boolean = true; // Vidljiva komponenta: pro-mod-sta-adm
  odabranaIzmjUklanj: boolean = false; // Vidljiva komponenta: automobili-tabela-adm
  odabranaIzmjUklanjOst: boolean = false; // Vidljiva komponente: proizvodjaci-tabela, modeli-tabela, statusi-tabela
  
  proizvodjaci: Proizvodjac[] = []; // Svi redovi tabele Proizvodjaci
  modeli: Model[] = []; // Svi redovi tabele Modeli
  statusi: Status[] = []; // Svi redovi tabele Statusi
  automobili: Automobil[] = []; // Svi redovi tabele Automobili
  automobiliAbc: Automobil[] = []; // Svi redovi tabele Automobili, u abecednom redosledu

  proizvodjacVidljiv: boolean; // Vidljiva komponenta: proizvodjac-adm
  modelVidljiv: boolean; // Vidljiva komponenta: model-adm
  statusVidljiv: boolean; // Vidljiva komponenta: status-adm

  vidljivoDodajP: boolean; // Vidljivo dugme 'Dodaj proizvodjaca', komponente proizvodjac-adm
  vidljivoIzmijeniP: boolean; // Vidljivo dugme 'Izmijeni proizvodjaca', komponente proizvodjac-adm

  odabraniProizvodjac: Proizvodjac;
  odabraniModel: Model;
  odabraniStatus: Status;
  odabraniAutomobil: Automobil;

  dodajModelBtn: boolean;
  dodajStatusBtn: boolean;
  dodajAutomobilBtn: boolean;

  constructor(private proizvodjaciService: ProizvodjaciService,
              private modeliService: ModeliService,
              private statusiService: StatusiService,
              private automobiliService: AutomobiliService, 
              private authService: AuthService, 
              private router: Router) { }

  ngOnInit(): void {

    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() 
                                                && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      
      this.proizvodjaciService.getProizvodjaci().subscribe(data => {
        this.proizvodjaci = data;
      });

      this.modeliService.getModeli().subscribe(data => {
        this.modeli = data;
      });

      this.statusiService.getStatusi().subscribe(data => {
        this.statusi = data;
      });

      this.automobiliService.getAutomobili().subscribe(data => {
        this.automobili = data;
        this.automobiliAbc = this.automobiliAbcFn(this.automobili);
      });

      // Mora ovdje da mu se dodjeli vrijednost, da bi mogao da radi @Input   ?????
      this.proizvodjacVidljiv = true;
      this.modelVidljiv = true;
      this.statusVidljiv = true;

      this.vidljivoDodajP = true;
      this.vidljivoIzmijeniP = false;

      this.odabraniProizvodjac = new Proizvodjac();
      this.odabraniModel = new Model();
      this.odabraniStatus = new Status();
      this.odabraniAutomobil = new Automobil();

      this.dodajModelBtn = true;
      this.dodajStatusBtn = true;
      this.dodajAutomobilBtn = true;
    }
    else {
      alert('Nemate administratorska prava!');
      this.router.navigateByUrl('/');
    }

  }

  automobiliAbcFn(aSvi: Automobil[]): Automobil[] {
    let aAbc: Automobil[];
    aAbc = aSvi.sort((a, b) => {
      let aProizvodjac: string = a.proizvodjac.naziv;
      let bProizvodjac: string = b.proizvodjac.naziv;
      let aModel: string = a.model.oznaka;
      let bModel: string = b.model.oznaka;
      if (aProizvodjac < bProizvodjac) {
        return -1;
      }
      else if (aProizvodjac > bProizvodjac) {
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

  kliknutoDodaj() {
    if (!this.odabranUnos) {
      this.odabranUnos = true;
      this.odabranUnosA = true;
      this.odabranUnosPrMoSt = true;
      this.odabranaIzmjUklanj = false;
      this.odabranaIzmjUklanjOst = false;

      this.modelVidljiv = true;
      this.statusVidljiv = true;

      this.ngOnInit();
    }
  }

  kliknutoIzmUkl() {
    this.ngOnInit();
    if (!this.odabranaIzmjUklanj) {
      this.odabranUnos = false;
      this.odabranUnosA = false;
      this.odabranUnosPrMoSt = false;
      this.odabranaIzmjUklanj = true;
      this.odabranaIzmjUklanjOst = false;
      //this.ngOnInit();
    }
  }

  kliknutoIzmUklOst() {
    if (!this.odabranaIzmjUklanjOst) {
      this.odabranUnos = false;
      this.odabranUnosA = false;
      this.odabranUnosPrMoSt = false;
      this.odabranaIzmjUklanj = false;
      this.odabranaIzmjUklanjOst = true;
      this.ngOnInit();
    }
  }

  ukloniAutomobil(automobil: Automobil) {
    if (confirm('Da li zaista zelite da obrisete ovaj automobil iz baze podataka?')) {
      this.automobiliService.deleteAutomobil(automobil.id).subscribe(data => {
        if (data.status === 0) {
          alert('Automobil je uklonjen iz baze podataka!');
          this.ngOnInit();
        }
        else if (data.status === -1) {
          alert('Prvo morate obrisati sve rezervacije ovog automobila!');
        }
        else {
          alert('Doslo je do greske pri upisu u bazu podataka!');
        }
      });
    }
  }

}
