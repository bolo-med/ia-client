import { Component, OnInit, Input, Host } from '@angular/core';
import { Proizvodjac } from 'src/app/models/Proizvodjac';
import { ProizvodjaciService } from 'src/app/services/proizvodjaci.service';
import { AutomobiliAdmComponent } from '../automobili-adm/automobili-adm.component';
import { AuthService } from 'src/app/services/auth.service';
import { Automobil } from 'src/app/models/Automobil';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { AutomobiliService } from 'src/app/services/automobili.service';
import { RezervacijeService } from 'src/app/services/rezervacije.service';

@Component({
  selector: 'app-proizvodjaci-tabela',
  templateUrl: './proizvodjaci-tabela.component.html',
  styleUrls: ['./proizvodjaci-tabela.component.scss']
})
export class ProizvodjaciTabelaComponent implements OnInit {

  @Input('proizvodjaci')
  proizvodjaci: Proizvodjac[] = [];

  @Input('vidljivoDodajP')
  vidljivoDodajP: boolean;

  @Input('vidljivoIzmijeniP')
  vidljivoIzmijeniP: boolean;

  constructor(private proizvodjaciService: ProizvodjaciService, 
              @Host() private parent: AutomobiliAdmComponent, 
              private authService: AuthService, 
              private automobiliService: AutomobiliService, 
              private rezervacijeService: RezervacijeService) { }

  ngOnInit(): void {
  }

  ukloniProizvodjaca(proizvodjac: Proizvodjac) {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      if (confirm('Da li zelite da uklonite proizvodjaca?')) {

        // let automobiliSvi: Automobil[];
        // let automobiliPoProizvodjacu: Automobil[];
        // let rezervacijeSve: Rezervacija[];
        // // let rezervacijePoAutomobilu: Rezervacija[];

        // this.automobiliService.getAutomobili().subscribe(data => {

        //   automobiliSvi = data;
        //   automobiliPoProizvodjacu = this.automobiliPoProizvodjacuFn(automobiliSvi, proizvodjac.id);

        //   if (automobiliPoProizvodjacu.length > 0) {

        //     this.rezervacijeService.getRezervacije().subscribe(data => {
        //       rezervacijeSve = data;
        //       let rezultat: boolean = this.obrisiRezervacijeAutomobila(automobiliPoProizvodjacu, rezervacijeSve);
        //       if (rezultat === true) {
        //         alert('Rezervacije su obrisane!');
        //         let rezultat: boolean = this.obrisiAutomobileFn(automobiliPoProizvodjacu);
        //         if (rezultat === true) {
        //           alert('Obrisani su automobili!');
        //           this.obrisiProizvodjacaFn(proizvodjac.id);
        //         }
        //       }
        //     });
        //   }
        //   else {
        //     this.obrisiProizvodjacaFn(proizvodjac.id)
        //   }
        // });

        this.proizvodjaciService.deleteProizvodjac(proizvodjac.id).subscribe(data => {
          if (data.status === 0) {
            alert('Proizvodjac je uklonjen iz baze podataka!');
            this.parent.ngOnInit();
          }
          else if (data.status === -1) {
            alert('Prvo morate ukloniti sve rezervacije automobila ovog proizvođača, a zatim i sve automobile ovog proizvođača!');
          }
          else {
            alert('Greska pri uklanjanju proizvodjaca!');
          }
        });

      }
    }
    else {
      alert('Nemate administratorska prava!');
    }
  }

  // automobiliPoProizvodjacuFn(aSvi: Automobil[], proizvID: number): Automobil[] {
  //   let aProizv: Automobil[] = [];
  //   for (let i: number = 0; i < aSvi.length; i++) {
  //     if (aSvi[i].proizvodjacID === proizvID) {
  //       aProizv.push(aSvi[i]);
  //     }
  //   }
  //   return aProizv;
  // }

  // rezervacijePoAutomobiluFn(rSve: Rezervacija[], aID: number): Rezervacija[] {
  //   let r: Rezervacija[];
  //   for (let i: number = 0; i < rSve.length; i++) {
  //     if (rSve[i].automobilID === aID) {
  //       r.push(rSve[i]);
  //     }
  //   }
  //   return r;
  // }

  // obrisiRezervacijeAutomobila(automobiliPoProizvodjacu: Automobil[], rezervacijeSve: Rezervacija[]): boolean {
  //   for (let i: number = 0; i < automobiliPoProizvodjacu.length; i++) {
  //     let automobilID: number = automobiliPoProizvodjacu[i].id;
  //     let rezervacijePoAutomobilu = this.rezervacijePoAutomobiluFn(rezervacijeSve, automobilID);
  //     if (rezervacijePoAutomobilu.length > 0) {
  //       let rezultat: boolean = this.obrisiRezervacijeFn(rezervacijePoAutomobilu);
  //       if (rezultat === true) {
  //         // alert('Rezervacije su obrisane!');
  //       }
  //       else {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // }

  // obrisiRezervacijeFn(rez: Rezervacija[]): boolean {
  //   for (let r of rez) {
  //     this.rezervacijeService.deleteRezervacija(r.id).subscribe(data => {
  //       if (data.status !== 0) {
  //         alert('Greska pri brisanju rezervacija!');
  //         return false;
  //       }
  //     });
  //   }
  //   // alert('Rezervacije su obrisane!');
  //   return true;
  // }

  // obrisiAutomobileFn(aut: Automobil[]): boolean {
  //   for (let a of aut) {
  //     this.automobiliService.deleteAutomobil(a.id).subscribe(data => {
  //       if (data.status !== 0) {
  //         alert('Greska pri brisanju automobila!');
  //         return false;
  //       }
  //     });
  //   }
  //   return true;
  // }

  // obrisiProizvodjacaFn(id: number) {
  //   this.proizvodjaciService.deleteProizvodjac(id).subscribe(data => {
  //     if (data.status === 0) {
  //       alert('Proizvodjac je uklonjen iz baze podataka!');
  //       this.parent.ngOnInit();
  //     }
  //     else {
  //       alert('Greska pri uklanjanju proizvodjaca!');
  //     }
  //   });
  // }

  izmijeniProizvodjaca(proizvodjac: Proizvodjac) {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      if (confirm('Da li ste sigurni da zelite da izmijenite proizvodjaca?')) {
        this.parent.odabranaIzmjUklanjOst = false;
        this.parent.odabranUnosPrMoSt = true;
        this.parent.modelVidljiv = false;
        this.parent.statusVidljiv = false;
  
        this.parent.vidljivoDodajP = false;
        this.parent.vidljivoIzmijeniP = true;
  
        this.parent.odabraniProizvodjac = proizvodjac;
      }
    }
    else {
      alert('Nemate administratorska prava!');
    }
  }

}

