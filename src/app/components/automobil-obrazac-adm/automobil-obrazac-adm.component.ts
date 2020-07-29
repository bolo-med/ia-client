import { Component, OnInit, Input } from '@angular/core';
import { Proizvodjac } from 'src/app/models/Proizvodjac';
import { Model } from 'src/app/models/Model';
import { Status } from 'src/app/models/Status';

@Component({
  selector: 'app-automobil-obrazac-adm',
  templateUrl: './automobil-obrazac-adm.component.html',
  styleUrls: ['./automobil-obrazac-adm.component.scss']
})
export class AutomobilObrazacAdmComponent implements OnInit {

  @Input('proizvodjaci')
  proizvodjaci: Proizvodjac[] = [];

  @Input('modeli')
  modeli: Model[] = [];

  @Input('statusi')
  statusi: Status[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
