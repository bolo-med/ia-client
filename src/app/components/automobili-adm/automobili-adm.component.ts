import { Component, OnInit } from '@angular/core';
import { Proizvodjac } from 'src/app/models/Proizvodjac';
import { ProizvodjaciService } from './../../services/proizvodjaci.service';
import { ModeliService } from './../../services/modeli.service';
import { StatusiService } from './../../services/statusi.service';
import { Model } from 'src/app/models/Model';
import { Status } from 'src/app/models/Status';

@Component({
  selector: 'app-automobili-adm',
  templateUrl: './automobili-adm.component.html',
  styleUrls: ['./automobili-adm.component.scss']
})
export class AutomobiliAdmComponent implements OnInit {

  odabranUnos = true;
  odabranaIzmjUklanj = false;
  proizvodjaci: Proizvodjac[] = [];
  modeli: Model[] = [];
  statusi: Status[] = [];

  constructor(private proizvodjaciService: ProizvodjaciService,
              private modeliService: ModeliService,
              private statusiService: StatusiService) { }

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

  }

  kliknutoDodaj() {
    if (!this.odabranUnos) {
      this.odabranUnos = true;
      this.odabranaIzmjUklanj = false;
    }
  }

  kliknutoIzmUkl() {
    if (!this.odabranaIzmjUklanj) {
      this.odabranUnos = false;
      this.odabranaIzmjUklanj = true;
    }
  }

}
