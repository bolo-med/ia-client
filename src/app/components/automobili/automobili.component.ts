import { Component, OnInit } from '@angular/core';
import { Automobil } from './../../models/Automobil';
import { AutomobiliService } from './../../services/automobili.service';
import { ProizvodjaciService } from 'src/app/services/proizvodjaci.service';
import { Proizvodjac } from 'src/app/models/Proizvodjac';

@Component({
  selector: 'app-automobili',
  templateUrl: './automobili.component.html',
  styleUrls: ['./automobili.component.scss']
})
export class AutomobiliComponent implements OnInit {

  naslovStranice: string = "Svi automobili iz ponude";
  automobili: Automobil[];
  proizvodjaciAbc: Proizvodjac[];

  constructor(private automobiliService: AutomobiliService, 
              private proizvodjaciService: ProizvodjaciService) {
                this.automobili = [];
                this.proizvodjaciAbc = [];
              }

  ngOnInit(): void {

    this.automobiliService.getAutomobili().subscribe(data => {
      this.automobili = data;
    });

    this.proizvodjaciService.getProizvodjaci().subscribe(data => {
      
      this.proizvodjaciAbc = this.proizvodjaciAbcFn(data);
    });

  }

  proizvodjaciAbcFn(p: Proizvodjac[]): Proizvodjac[] {
    let pAbc = p.sort((a, b) => {
      let nazivA = a.naziv.toUpperCase();
      let nazivB = b.naziv.toUpperCase();
      if (nazivA < nazivB) {
        return -1;
      }
      else if (nazivA > nazivB) {
        return 1;
      }
      return 0;
    });
    return pAbc;
  }

}
