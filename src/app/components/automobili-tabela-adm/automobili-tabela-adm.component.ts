import { Component, OnInit, Input, Host } from '@angular/core';
import { Automobil } from '../../models/Automobil';
import { AutomobiliAdmComponent } from '../automobili-adm/automobili-adm.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-automobili-tabela-adm',
  templateUrl: './automobili-tabela-adm.component.html',
  styleUrls: ['./automobili-tabela-adm.component.scss']
})
export class AutomobiliTabelaAdmComponent implements OnInit {

  @Input('automobili')
  automobili: Automobil[] = [];

  constructor(@Host() private parent: AutomobiliAdmComponent, 
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  ukloniAutomobil(automobil: Automobil) {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      this.parent.ukloniAutomobil(automobil);
    }
    else {
      alert('Nemate administratorska prava!');
    }
  }

  izmijeniAutomobil(automobil: Automobil) {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      if (confirm('Da li zelite da izmijenite automobil?')) {
        // Deselektuje radio-dugme i uklanja ovu komponentu
        this.parent.odabranaIzmjUklanj = false;
  
        // Dodaje komponentu automobil-obrazac-adm
        this.parent.odabranUnosA = true;
  
        // Dugme Izmijeni, umjesto Dodaj
        this.parent.dodajAutomobilBtn = false;
  
        // Prosledjuje automobil nadkomponenti
        this.parent.odabraniAutomobil = automobil;
      }
    }
    else {
      alert('Nemate administratorska prava!');
    }
  }
  
}

