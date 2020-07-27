import { Component, OnInit } from '@angular/core';
import { Automobil } from './../../models/Automobil';
import { AutomobilComponent } from '../automobil/automobil.component';

@Component({
  selector: 'app-automobili',
  templateUrl: './automobili.component.html',
  styleUrls: ['./automobili.component.scss']
})
export class AutomobiliComponent implements OnInit {

  naslovStranice = "Spisak svih automobila";
  automobili: Automobil[] = [];
  selektovaniAutomobil: Automobil;

  constructor() { }

  ngOnInit(): void {
    this.automobili = [
      {
        id: 1,
        proizvodjac: 'Zastava',
        model: 'Yugo',
        cijena: 49.99
      },
      {
        id: 2,
        proizvodjac: 'Dacia',
        model: 'Sandero',
        cijena: 59.99
      }
    ];
  }

}
