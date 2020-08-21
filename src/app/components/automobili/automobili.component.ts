import { Component, OnInit } from '@angular/core';
import { Automobil } from './../../models/Automobil';
import { AutomobiliService } from './../../services/automobili.service';
import { ProizvodjaciService } from 'src/app/services/proizvodjaci.service';
import { Proizvodjac } from 'src/app/models/Proizvodjac';
import { AuthService } from 'src/app/services/auth.service';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { RezervacijeService } from 'src/app/services/rezervacije.service';

@Component({
  selector: 'app-automobili',
  templateUrl: './automobili.component.html',
  styleUrls: ['./automobili.component.scss']
})
export class AutomobiliComponent implements OnInit {

  naslovStranice: string;
  automobili: Automobil[];
  proizvodjaciAbc: Proizvodjac[];
  proizvodjaciChecked: boolean[];
  svi: boolean;
  odabraniAutomobil: Automobil;
  rezervacijeAutomobilID: Rezervacija[]; // Mora ovako. Custom upit vraca samo raw podatke.

  constructor(private automobiliService: AutomobiliService, 
              private proizvodjaciService: ProizvodjaciService, 
              private authService: AuthService, 
              private rezervacijeService: RezervacijeService) {
                this.automobili = [];
                this.proizvodjaciAbc = [];
                this.proizvodjaciChecked = [];
                this.rezervacijeAutomobilID = [];
              }

  ngOnInit(): void {

    this.naslovStranice = "Svi automobili iz ponude";
    this.svi = true;

    this.proizvodjaciService.getProizvodjaci().subscribe(data => {
      this.proizvodjaciChecked = this.proizvodjaciCheckedFn(data.length);
      this.proizvodjaciAbc = this.proizvodjaciAbcFn(data);
    });

    this.automobiliService.getAutomobili().subscribe(data => {
        this.automobili = data;
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

  proizvodjaciCheckedFn(l: number): boolean[] {
    // console.log(l);
    let arr: boolean[] = [];
    for (let i: number = 0; i <= (l-1); i++) {
      arr[i] = false;
    }
    return arr;
  }

  allProizvodjaciUnChecked(): boolean {
    let s: number = 0;
    let l: number = this.proizvodjaciChecked.length;

    for (let i: number = 0; i <= (l-1); i++) {
      if (this.proizvodjaciChecked[i] === false) {
        s++;
      }
    }

    if ((s === 0) || (s === l)) {
      return true;
    }
    else {
      return false;
    }
  }

  prikaziOdabrane() {
    this.automobiliService.getAutomobili().subscribe(data => {
      this.automobili = [];
      this.automobili = this.izdvojOdabrane(data);
    });
  }

  izdvojOdabrane(data: Automobil[]): Automobil[] {
    let cekiraniProizvodjaci: string[] = this.izdvojCekiraneProizvodjace();
    let izdvojeniArr: Automobil[] = [];
    let l: number = data.length;
    let l2: number = cekiraniProizvodjaci.length;
    
    for (let i: number = 0; i <= (l-1); i++) {
      for (let j: number = 0; j <= (l2-1); j++) {
        if (data[i].proizvodjac.naziv === cekiraniProizvodjaci[j]) {
          izdvojeniArr.push(data[i]);
          break;
        }
      }
    }
    return izdvojeniArr;
  }

  izdvojCekiraneProizvodjace(): string[] {
    let l: number = this.proizvodjaciAbc.length;
    let izdvojeniProizvodjaci: string[] = [];
    for (let i: number = 0; i <= (l-1); i++) {
      if (this.proizvodjaciChecked[i] === true) {
        izdvojeniProizvodjaci.push(this.proizvodjaciAbc[i].naziv);
      }
    }
    return izdvojeniProizvodjaci;
  }

  nadjiAutomobil(id: number) {

    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn()) {

      this.automobiliService.getAutomobilByID(id).subscribe(data => {
        this.odabraniAutomobil = data;
        this.svi = false;
        this.naslovStranice = 'Detaljnije o iznajmljivanju';
      });

      this.rezervacijeService.getRezervacije().subscribe(data => {
        this.rezervacijeAutomobilID = this.izdvojRezervacije(data, id);
      });

    }
    else {
      alert('Morate biti prijavljeni!');
    }
    
  }

  izdvojRezervacije(rez: Rezervacija[], id: number): Rezervacija[] {
    let rezAut: Rezervacija[] = [];
    for (let i: number = 0; i < rez.length; i++) {
      if (rez[i].automobilID === id) {
        rezAut.push(rez[i]);
      }
    }
    return rezAut;
  }

}
