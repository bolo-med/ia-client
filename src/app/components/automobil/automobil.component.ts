import { Component, OnInit, Input, Host } from '@angular/core';
import { Proizvodjac } from 'src/app/models/Proizvodjac';
import { AutomobiliComponent } from '../automobili/automobili.component';

// Promijenjena namjena komponente, u filter.

@Component({
  selector: 'app-automobil',
  templateUrl: './automobil.component.html',
  styleUrls: ['./automobil.component.scss']
})
export class AutomobilComponent implements OnInit {

  @Input('proizvodjaciAbc')
  proizvodjaciAbc: Proizvodjac[];

  @Input('proizvodjaciChecked')
  proizvodjaciChecked: boolean[];

  constructor(@Host() private parent: AutomobiliComponent) { }

  ngOnInit(): void {}

  prikaziFiltrirano() {
    if (this.parent.allProizvodjaciUnChecked()) {
      this.parent.ngOnInit();
    }
    else {
      this.parent.prikaziOdabrane();
    }
    
  }

  unChecked(index: number) {
    this.proizvodjaciChecked[index] = !this.proizvodjaciChecked[index];
  }

}
