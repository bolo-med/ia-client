import { Component, OnInit, Input } from '@angular/core';
import { Automobil } from 'src/app/models/Automobil';

@Component({
  selector: 'app-automobil',
  templateUrl: './automobil.component.html',
  styleUrls: ['./automobil.component.scss']
})
export class AutomobilComponent implements OnInit {

  @Input('selektovaniAutomobil')
  selektovaniAutomobil: Automobil = new Automobil();

  constructor() { }

  ngOnInit(): void { }

}
