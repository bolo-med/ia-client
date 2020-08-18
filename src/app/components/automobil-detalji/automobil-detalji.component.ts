import { Component, OnInit, Host, Input } from '@angular/core';
import { AutomobiliComponent } from '../automobili/automobili.component';
import { Automobil } from 'src/app/models/Automobil';
import { environment } from 'src/environments/environment';
import { Rezervacija } from 'src/app/models/Rezervacija';

@Component({
  selector: 'app-automobil-detalji',
  templateUrl: './automobil-detalji.component.html',
  styleUrls: ['./automobil-detalji.component.scss']
})
export class AutomobilDetaljiComponent implements OnInit {

  apiUrl = environment.apiUrl;
  rezervacija: Rezervacija = new Rezervacija();
  danasnjiDatum: Date = new Date();

  preuzimanjeAlert: boolean;
  vracanjeAlert: boolean;
  razlikaAlert: boolean;

  @Input('odabraniAutomobil')
  odabraniAutomobil: Automobil;

  constructor(@Host() private parent: AutomobiliComponent) {
    this.preuzimanjeAlert = false;
    this.vracanjeAlert = false;
    this.razlikaAlert = false;
  }

  ngOnInit(): void { }

  odustani() {
    this.parent.ngOnInit();
  }

  rezervisi() {
    if (this.rezervacija.datumPreuzimanja && this.rezervacija.datumVracanja) {
      let danasnjiDatumStr = this.danasnjiDatum.toISOString().split('T')[0];
      let datumPreuzimanjaStr = new Date(this.rezervacija.datumPreuzimanja).toISOString().split('T')[0];
      let datumVracanjaStr = new Date(this.rezervacija.datumVracanja).toISOString().split('T')[0];

      if (datumPreuzimanjaStr <= datumVracanjaStr) {
        console.log('Danas: ' + danasnjiDatumStr);
        console.log('Preuzimanje: ' + datumPreuzimanjaStr);
        console.log('Vracanje: ' + datumVracanjaStr);
        
        console.log('Danas >= Preuzimanje : ' + (danasnjiDatumStr >= datumPreuzimanjaStr));
      }
      
    }
    else {
      if (!this.rezervacija.datumPreuzimanja) {
        this.preuzimanjeAlert = true;
      }
      if (!this.rezervacija.datumVracanja) {
        this.vracanjeAlert = true;
      }
    }
  }

  promjena() {
    if (this.rezervacija.datumPreuzimanja) {
      this.preuzimanjeAlert = false;
    }
    if (this.rezervacija.datumVracanja) {
      this.vracanjeAlert = false;
    }
    if (this.rezervacija.datumPreuzimanja && this.rezervacija.datumVracanja) {
      let preuzStr: string = new Date(this.rezervacija.datumPreuzimanja).toISOString().split('T')[0];;
      let vracStr: string = new Date(this.rezervacija.datumVracanja).toISOString().split('T')[0];
      if (preuzStr > vracStr) {
        this.razlikaAlert = true;
      }
      else {
        this.razlikaAlert = false;
      }
    }
  }

}
