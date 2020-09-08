import { Component, OnInit, Input, Host } from '@angular/core';
import { Model } from 'src/app/models/Model';
import { ModeliService } from 'src/app/services/modeli.service';
import { AutomobiliAdmComponent } from '../automobili-adm/automobili-adm.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modeli-tabela',
  templateUrl: './modeli-tabela.component.html',
  styleUrls: ['./modeli-tabela.component.scss']
})
export class ModeliTabelaComponent implements OnInit {

  @Input('modeli')
  modeli: Model[] = [];

  constructor(private modeliService: ModeliService, 
              @Host() private parent: AutomobiliAdmComponent, 
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  ukloniModel(model: Model) {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      if (confirm('Da li zelite da uklonite model?')) {
        this.modeliService.deleteModel(model.id).subscribe(data => {
          if (data.status === 0) {
            alert('Model je uklonjen uz baze podataka!');
            this.parent.ngOnInit();
          }
          else if (data.status === -1) {
            alert('Prvo morate ukloniti sve rezervacije automobila ovog modela, a zatim i sve automobile ovog modela!');
          }
          else {
            alert('Doslo je do greske pri uklanjanju modela!');
          }
        });
      }
    }
    else {
      alert('Nemate administratorska prava!');
    }
  }

  izmijeniModel(model: Model) {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      if (confirm('Da li zelite da izmijenite model?')) {
        this.parent.odabranaIzmjUklanjOst = false;
        this.parent.odabranUnosPrMoSt = true;
        this.parent.proizvodjacVidljiv = false;
        this.parent.statusVidljiv = false;
  
        this.parent.odabraniModel = model;
        this.parent.dodajModelBtn = false;
      }
    }
    else {
      alert('Nemate administratorska prava!');
    }
  }

}
