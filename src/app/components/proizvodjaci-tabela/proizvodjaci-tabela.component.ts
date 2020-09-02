import { Component, OnInit, Input, Host } from '@angular/core';
import { Proizvodjac } from 'src/app/models/Proizvodjac';
import { ProizvodjaciService } from 'src/app/services/proizvodjaci.service';
import { AutomobiliAdmComponent } from '../automobili-adm/automobili-adm.component';
import { AuthService } from 'src/app/services/auth.service';

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
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  ukloniProizvodjaca(proizvodjac: Proizvodjac) {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      if (confirm('Da li zelite da uklonite proizvodjaca?')) {
        this.proizvodjaciService.deleteProizvodjac(proizvodjac.id).subscribe(data => {
          if (data.status === 0) {
            alert('Proizvodjac je uklonjen iz baze podataka!');
            this.parent.ngOnInit();
          }
          else {
            alert('Doslo je do greske pri upisivanju u bazu podataka!');
          }
        });
      }
    }
    else {
      alert('Nemate administratorska prava!');
    }
  }

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

