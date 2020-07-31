import { Component, OnInit, Input, Host } from '@angular/core';
import { Proizvodjac } from 'src/app/models/Proizvodjac';
import { Model } from 'src/app/models/Model';
import { Status } from 'src/app/models/Status';
import { Automobil } from 'src/app/models/Automobil';
import { AutomobiliService } from 'src/app/services/automobili.service';
import { AutomobiliAdmComponent } from '../automobili-adm/automobili-adm.component';

@Component({
  selector: 'app-automobil-obrazac-adm',
  templateUrl: './automobil-obrazac-adm.component.html',
  styleUrls: ['./automobil-obrazac-adm.component.scss']
})
export class AutomobilObrazacAdmComponent implements OnInit {

  automobil: Automobil = new Automobil();

  @Input('proizvodjaci')
  proizvodjaci: Proizvodjac[] = [];

  @Input('modeli')
  modeli: Model[] = [];

  @Input('statusi')
  statusi: Status[] = [];

  constructor(private automobiliService: AutomobiliService, 
              @Host() private parent: AutomobiliAdmComponent) { }

  ngOnInit(): void { }

  dodajAutomobil() {
    if (confirm('Jeste li sigurni?')) {
      this.automobiliService.insertAutomobil(this.automobil).subscribe(data => {
        if (data.status === 0) {
          alert('Automobil je dodat u bazu podataka!');
          this.parent.ngOnInit();
        }
        else {
          alert('Doslo je do greske!');
        }
      });
    }
  }

  toNumber() {
    this.automobil.proizvodjacID = (+this.automobil.proizvodjacID);
    this.automobil.modelID = (+this.automobil.modelID);
    this.automobil.statusID = (+this.automobil.statusID);
    this.automobil.godiste = (+this.automobil.godiste);
    this.automobil.cijena = (+this.automobil.cijena);
  }

}
