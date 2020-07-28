import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-automobili-adm',
  templateUrl: './automobili-adm.component.html',
  styleUrls: ['./automobili-adm.component.scss']
})
export class AutomobiliAdmComponent implements OnInit {

  odabranUnos = true;
  odabranaIzmjUklanj = false;

  constructor() { }

  ngOnInit(): void {
  }

  kliknuto1() {
    if (!this.odabranUnos) {
      this.odabranUnos = true;
      this.odabranaIzmjUklanj = false;
    }
  }

  kliknuto2() {
    if (!this.odabranaIzmjUklanj) {
      this.odabranUnos = false;
      this.odabranaIzmjUklanj = true;
    }
  }

}
