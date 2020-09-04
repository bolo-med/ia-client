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

  @Input('brMjesta')
  brMjesta: number[];

  @Input('brMjestaChecked')
  brMjestaChecked: boolean[];

  constructor(@Host() private parent: AutomobiliComponent) { }

  ngOnInit(): void {}

  prikaziFiltrirano() {
    
    if (this.parent.allProizvodjaciUnChecked() && this.parent.allMjenjaciUnChecked() 
                                               && this.parent.allMjestaUnChecked()) {
      this.parent.ngOnInit();
    }
    else {
      this.parent.prikaziOdabrane();
    }
    
  }

  unChecked(index: number) {
    this.proizvodjaciChecked[index] = !this.proizvodjaciChecked[index];
  }

  unChecked2(index: number) {
    this.brMjestaChecked[index] = !this.brMjestaChecked[index];
  }


  // Ne moze drugacije da promijeni vrijednost u AutomobiliComponent //////////////////////////////////////////////

  unCheckMM() {
    this.parent.manuelMj = !this.parent.manuelMj;
  }

  unCheckAM() {
    this.parent.autoMj = !this.parent.autoMj;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  

}
