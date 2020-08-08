import { Component, OnInit, Input } from '@angular/core';
import { Automobil } from 'src/app/models/Automobil';
import { Proizvodjac } from 'src/app/models/Proizvodjac';

// Promijenjena namjena komponente, u filter.

@Component({
  selector: 'app-automobil',
  templateUrl: './automobil.component.html',
  styleUrls: ['./automobil.component.scss']
})
export class AutomobilComponent implements OnInit {

  @Input('proizvodjaciAbc')
  proizvodjaciAbc: Proizvodjac[];

  @Input('automobili')
  automobili: Automobil[];

  constructor() { }

  ngOnInit(): void {}

}
