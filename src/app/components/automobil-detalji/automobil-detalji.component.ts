import { Component, OnInit, Host, Input } from '@angular/core';
import { AutomobiliComponent } from '../automobili/automobili.component';
import { Automobil } from 'src/app/models/Automobil';

@Component({
  selector: 'app-automobil-detalji',
  templateUrl: './automobil-detalji.component.html',
  styleUrls: ['./automobil-detalji.component.scss']
})
export class AutomobilDetaljiComponent implements OnInit {

  @Input('odabraniAutomobil')
  odabraniAutomobil: Automobil;

  constructor(@Host() private parent: AutomobiliComponent) { }

  ngOnInit(): void { }

  odustani() {
    this.parent.ngOnInit();
  }

}
