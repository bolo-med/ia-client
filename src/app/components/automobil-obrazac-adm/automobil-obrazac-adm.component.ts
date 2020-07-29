import { Component, OnInit, Input } from '@angular/core';
import { Proizvodjac } from 'src/app/models/Proizvodjac';
import { Model } from 'src/app/models/Model';
import { Status } from 'src/app/models/Status';
import { Automobil } from 'src/app/models/Automobil';
import { AutomobiliService } from 'src/app/services/automobili.service';

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

  constructor(private automobiliService: AutomobiliService) { }

  ngOnInit(): void { }

  dodajAutomobil() {
    if (confirm('Jeste li sigurni?')) {
      this.automobiliService.insertAutomobil(this.automobil).subscribe(data => {
        if (data.status === 0) {
          console.log('Automobil je dodat u bazu podataka!');
        }
        else {
          console.log('Doslo je do greske!');
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
