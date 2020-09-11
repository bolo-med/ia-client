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
  rezAutomIdAktivne: Rezervacija[];
  autoMj: boolean;
  manuelMj: boolean;
  brMjesta: number[];
  brMjestaChecked: boolean[];

  v2: boolean;
  usrInf: string;

  constructor(private automobiliService: AutomobiliService, 
              private proizvodjaciService: ProizvodjaciService, 
              private authService: AuthService, 
              private rezervacijeService: RezervacijeService) {
                this.automobili = [];
                this.proizvodjaciAbc = [];
                this.proizvodjaciChecked = [];
                this.rezervacijeAutomobilID = [];
                this.rezAutomIdAktivne = [];
              }

  ngOnInit(): void {

    this.autoMj = false;
    this.manuelMj = false;
    this.brMjesta = [];

    this.naslovStranice = "Svi automobili iz ponude";
    this.svi = true;

    this.proizvodjaciService.getProizvodjaci().subscribe(data => {
      this.automobiliService.getAutomobili().subscribe(data2 => {
          this.brMjesta = this.brMjestaFn(data2);
          this.brMjesta = this.brMjestaAbcFn(this.brMjesta);
          this.brMjestaChecked = this.setAllBrMjestaToFalse(this.brMjesta.length);
          this.automobili = data2;
          this.proizvodjaciAbc = this.proizvodjaciAbcFn(data);
      });
    });

    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn()) {
      this.v2 = true;
      this.usrInf = 'Ulogovani ste kao: ' + this.authService.getKorisnikDetails().username;
    }

  }

  brMjestaFn(automobiliSvi: Automobil[]): number[] {
    let brMjesta: number[] = [];
    if (automobiliSvi.length > 0) {
      brMjesta.push(automobiliSvi[0].brPutnika);
    }
    for (let i: number = 0; i < automobiliSvi.length; i++) {
      if (!this.vecUpisan(brMjesta, automobiliSvi[i].brPutnika)) {
        brMjesta.push(automobiliSvi[i].brPutnika);
      }
    }
    return brMjesta;
  }

  vecUpisan(mjesta: number[], br: number) {
    for (let i: number = 0; i < mjesta.length; i++) {
      if (mjesta[i] === br) {
        return true;
      }
    }
    return false;
  }

  brMjestaAbcFn(brMjesta: number[]): number[] {
    brMjesta = brMjesta.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      else if (a < b) {
        return -1;
      }
      else {
        return 0;
      }
    });
    return brMjesta;
  }

  setAllBrMjestaToFalse(l: number): boolean[] {
    let arr: boolean[] = [];
    for (let i: number = 0; i < l; i++) {
      arr.push(false);
    }
    return arr;
  }

  proizvodjaciAbcFn(p: Proizvodjac[]): Proizvodjac[] {
    
    let upotrebljeniProizvodjaci: Proizvodjac[] = [];
    upotrebljeniProizvodjaci = this.upotrebljeniProizvodjaciFn(p);

    let upotrAbc = upotrebljeniProizvodjaci.sort((a, b) => {
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
    
    this.proizvodjaciChecked = this.proizvodjaciCheckedFn(upotrAbc.length);
    
    return upotrAbc;
  }

  upotrebljeniProizvodjaciFn(svi: Proizvodjac[]): Proizvodjac[] {
    let upotrebljeni: Proizvodjac[] = [];
    for (let i: number = 0; i < svi.length; i++) {
      for (let j: number = 0; j < this.automobili.length; j++) {
        if (svi[i].id === this.automobili[j].proizvodjacID) {
          upotrebljeni.push(svi[i]);
          break;
        }
      }
    }
    return upotrebljeni;
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

  allMjenjaciUnChecked(): boolean {
    
    if ((this.autoMj === true) && (this.manuelMj === true)) {
      return true;
    }
    else if ((this.autoMj === false) && (this.manuelMj === false)) {
      return true;
    }
    else return false;
  }

  allMjestaUnChecked() {
    let s: number = 0;
    let l: number = this.brMjestaChecked.length;

    for (let i: number = 0; i <= (l-1); i++) {
      if (this.brMjestaChecked[i] === false) {
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

  izdvojOdabrane(automobiliSvi: Automobil[]): Automobil[] {

    let arr: Automobil[] = [];

    if ((this.allProizvodjaciUnChecked() === false) && (this.allMjenjaciUnChecked() === true) 
                                                    && (this.allMjestaUnChecked() === true)) {
      arr = this.automobiliIzabraniMjenjaciSvi(automobiliSvi);
    }
    else if ((this.allProizvodjaciUnChecked() === false) && (this.allMjenjaciUnChecked() === false) 
                                                         && (this.allMjestaUnChecked() === true)) {
      if ((this.autoMj === true) && (this.manuelMj === false)) {
        let arr2: Automobil[] = [];
        arr2 = this.automobiliIzabraniMjenjaciSvi(automobiliSvi);
        arr = this.automobiliIzabraniMjenjaciAut(arr2);
      }
      else {
        let arr2: Automobil[] = [];
        arr2 = this.automobiliIzabraniMjenjaciSvi(automobiliSvi);
        arr = this.automobiliIzabraniMjenjaciMan(arr2);
      }
    }
    else if ((this.allProizvodjaciUnChecked() === true) && (this.allMjenjaciUnChecked() === false) 
                                                        && (this.allMjestaUnChecked() === true)) {
      if ((this.autoMj === true) && (this.manuelMj === false)) {
        arr = this.automobiliIzabraniMjenjaciAut(automobiliSvi);
      }
      else {
        arr = this.automobiliIzabraniMjenjaciMan(automobiliSvi);
      }
    }
    else if ((this.allProizvodjaciUnChecked() === true) && (this.allMjenjaciUnChecked() === true) 
                                                        && (this.allMjestaUnChecked() === false)) {
      arr = this.automobiliPoBrojuMjesta(automobiliSvi);
    }
    else if ((this.allProizvodjaciUnChecked() === true) && (this.allMjenjaciUnChecked() === false) 
                                                        && (this.allMjestaUnChecked() === false)) {

      if ((this.autoMj === true) && (this.manuelMj === false)) {
        arr = this.automobiliIzabraniMjenjaciAut(automobiliSvi);
        arr = this.automobiliPoBrojuMjesta(arr);
      }
      else {
        arr = this.automobiliIzabraniMjenjaciMan(automobiliSvi);
        arr = this.automobiliPoBrojuMjesta(arr);
      }

    }
    else if ((this.allProizvodjaciUnChecked() === false) && (this.allMjenjaciUnChecked() === false) 
                                                         && (this.allMjestaUnChecked() === false)) {

      arr = this.automobiliIzabraniMjenjaciSvi(automobiliSvi);
      
      if ((this.autoMj === true) && (this.manuelMj === false)) {
        arr = this.automobiliIzabraniMjenjaciAut(arr);
      }
      else {
        arr = this.automobiliIzabraniMjenjaciMan(arr);
      }

      arr = this.automobiliPoBrojuMjesta(arr);

    }
    else if ((this.allProizvodjaciUnChecked() === false) && (this.allMjenjaciUnChecked() === true) 
                                                         && (this.allMjestaUnChecked() === false)) {
                                                          
      arr = this.automobiliIzabraniMjenjaciSvi(automobiliSvi);
      arr = this.automobiliPoBrojuMjesta(arr);

    }

    return arr;

  }

  // Iz niza tipa Automobil[], izdvaja automobile odabranih naziva proizvodjaca
  automobiliIzabraniMjenjaciSvi(automobiliSvi: Automobil[]): Automobil[] {
    let cekiraniProizvodjaci: string[] = this.izdvojCekiraneProizvodjace();
    let izdvojeniArr: Automobil[] = [];
    let l: number = automobiliSvi.length;
    let l2: number = cekiraniProizvodjaci.length;
    
    for (let i: number = 0; i <= (l-1); i++) {
      for (let j: number = 0; j <= (l2-1); j++) {
        if (automobiliSvi[i].proizvodjac.naziv === cekiraniProizvodjaci[j]) {
          izdvojeniArr.push(automobiliSvi[i]);
          break;
        }
      }
    }
    return izdvojeniArr;
  }

  // Iz niza tipa Automobil[], izdvaja automobile koji imaju automatski mjenjac
  automobiliIzabraniMjenjaciAut(arrMjSvi: Automobil[]): Automobil[] {
    let arrMjAut: Automobil[] = [];
    for (let i: number = 0; i < arrMjSvi.length; i++) {
      if (arrMjSvi[i].automatskiMjenjac === true) {
        arrMjAut.push(arrMjSvi[i]);
      }
    }
    return arrMjAut;
  }

  // Iz niza tipa Automobil[], izdvaja automobile koji imaju manuelni mjenjac
  automobiliIzabraniMjenjaciMan(arrMjSvi: Automobil[]): Automobil[] {
    let arrMjMan: Automobil[] = [];
    for (let i: number = 0; i < arrMjSvi.length; i++) {
      if (arrMjSvi[i].automatskiMjenjac === false) {
        arrMjMan.push(arrMjSvi[i]);
      }
    }
    return arrMjMan;
  }

  // Iz niza tipa Automobil[], izdvaja automobile koji imaju odabrani broj mjesta za putnike
  automobiliPoBrojuMjesta(a: Automobil[]): Automobil[] {
    let a2: Automobil[] = [];
    let brMjIzabrani: number[] = this.brMjIzabraniFn();
    for (let i: number = 0; i < a.length; i++) {
      for (let j: number = 0; j < brMjIzabrani.length; j++) {
        if (a[i].brPutnika === brMjIzabrani[j]) {
          a2.push(a[i]);
          break;
        }
      }
    }
    return a2;
  }

  brMjIzabraniFn(): number[] {
    let arr: number[] = [];
    let l: number = this.brMjesta.length; // brMjestaChecked.length === brMjesta.length
    for (let i: number = 0; i < l; i++) {
      if (this.brMjestaChecked[i] === true) {
        arr.push(this.brMjesta[i]);
      }
    }
    return arr;
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
        if (data.status === 0) {
          this.odabraniAutomobil = data.data;
          this.svi = false;
          this.naslovStranice = 'Detaljnije o iznajmljivanju';
        }
        else {
          alert('Greska pri pretrazivanju automobila!');
        }
      });

      this.rezervacijeService.getRezervacije().subscribe(data => {
        this.rezervacijeAutomobilID = this.izdvojRezervacije(data, id);
        this.rezAutomIdAktivne = this.rezAutomIdAktivneFn(this.rezervacijeAutomobilID);
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

  rezAutomIdAktivneFn(rID: Rezervacija[]): Rezervacija[] {
    let r: Rezervacija[] = [];
    for (let i: number = 0; i < rID.length; i++) {
      if ((rID[i].datumStvarnogVracanja === null) && (rID[i].realizovana !== false)) {
        r.push(rID[i]);
      }
    }
    return r;
  }

}
