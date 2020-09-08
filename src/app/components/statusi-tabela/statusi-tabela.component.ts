import { Component, OnInit, Input, Host } from '@angular/core';
import { Status } from 'src/app/models/Status';
import { StatusiService } from 'src/app/services/statusi.service';
import { AutomobiliAdmComponent } from '../automobili-adm/automobili-adm.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-statusi-tabela',
  templateUrl: './statusi-tabela.component.html',
  styleUrls: ['./statusi-tabela.component.scss']
})
export class StatusiTabelaComponent implements OnInit {

  @Input('statusi')
  statusi: Status[] = [];

  constructor(private statusiService: StatusiService, 
              @Host() private parent: AutomobiliAdmComponent, 
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  ukloniStatus(status: Status) {
    if(window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      if (confirm('Da li zelite da uklonite status?')) {
        this.statusiService.deleteStatus(status.id).subscribe(data => {
          if (data.status === 0) {
            alert('Status je uklonjen iz baze podataka!');
            this.parent.ngOnInit();
          }
          else if (data.status === -1) {
            alert('Prvo morate ukloniti sve rezervacije automobila ovog statusa, a zatim i sve automobile ovog statusa!');
          }
          else {
            alert('Doslo je do greske pri uklanjanju statusa!');
          }
        });
      }
    }
    else {
      alert('Nemate administratorska prava!');
    }
  }

  izmijeniStatus(status: Status) {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      if (confirm('Da li zelite da izmijenite status?')) {
        this.parent.odabranaIzmjUklanjOst = false;
        this.parent.odabranUnosPrMoSt = true;
        this.parent.proizvodjacVidljiv = false;
        this.parent.modelVidljiv = false;
  
        this.parent.odabraniStatus = status;
        this.parent.dodajStatusBtn = false;
      }
    }
    else {
      alert('Nemate administratorska prava!');
    }
  }

}
