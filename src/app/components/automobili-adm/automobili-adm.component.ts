import { Component, OnInit } from '@angular/core';
import { Proizvodjac } from 'src/app/models/Proizvodjac';
import { ProizvodjaciService } from './../../services/proizvodjaci.service';
import { ModeliService } from './../../services/modeli.service';
import { StatusiService } from './../../services/statusi.service';
import { Model } from 'src/app/models/Model';
import { Status } from 'src/app/models/Status';
import { Automobil } from 'src/app/models/Automobil';
import { AutomobiliService } from 'src/app/services/automobili.service';

@Component({
  selector: 'app-automobili-adm',
  templateUrl: './automobili-adm.component.html',
  styleUrls: ['./automobili-adm.component.scss']
})
export class AutomobiliAdmComponent implements OnInit {

  odabranUnos: boolean = true;
  odabranaIzmjUklanj: boolean = false;
  odabranaIzmjUklanjOst: boolean = false;
  proizvodjaci: Proizvodjac[] = [];
  modeli: Model[] = [];
  statusi: Status[] = [];
  automobili: Automobil[] = [];

  constructor(private proizvodjaciService: ProizvodjaciService,
              private modeliService: ModeliService,
              private statusiService: StatusiService,
              private automobiliService: AutomobiliService) { }

  ngOnInit(): void {

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
    });
    
  }

  kliknutoDodaj() {
    if (!this.odabranUnos) {
      this.odabranUnos = true;
      this.odabranaIzmjUklanj = false;
      this.odabranaIzmjUklanjOst = false;
    }
  }

  kliknutoIzmUkl() {
    if (!this.odabranaIzmjUklanj) {
      this.odabranUnos = false;
      this.odabranaIzmjUklanj = true;
      this.odabranaIzmjUklanjOst = false;
    }
  }

  kliknutoIzmUklOst() {
    if (!this.odabranaIzmjUklanjOst) {
      this.odabranaIzmjUklanjOst = true;
      this.odabranUnos = false;
      this.odabranaIzmjUklanj = false;
    }
  }

  ukloniAutomobil(automobil: Automobil) {
    if (confirm('Da li zaista zelite da obrisete ovaj automobil iz baze podataka?')) {
      this.automobiliService.deleteAutomobil(automobil.id).subscribe(data => {
        if (data.status === 0) {
          alert('Automobil je uklonjen iz baze podataka!');
          this.ngOnInit();
        }
        else {
          alert('Doslo je do greske pri upisu u bazu podataka!');
        }
      });
    }
  }

}
