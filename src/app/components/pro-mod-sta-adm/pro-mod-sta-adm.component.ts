import { Component, OnInit, Host, Input } from '@angular/core';
import { AutomobiliAdmComponent } from '../automobili-adm/automobili-adm.component';
import { Proizvodjac } from 'src/app/models/Proizvodjac';
import { Model } from 'src/app/models/Model';
import { Status } from 'src/app/models/Status';

@Component({
  selector: 'app-pro-mod-sta-adm',
  templateUrl: './pro-mod-sta-adm.component.html',
  styleUrls: ['./pro-mod-sta-adm.component.scss']
})
export class ProModStaAdmComponent implements OnInit {

  @Input('proizvodjacVidljiv')
  proizvodjacVidljiv: boolean;
  
  @Input('modelVidljiv')
  modelVidljiv: boolean;

  @Input('statusVidljiv')
  statusVidljiv: boolean;

  @Input('vidljivoDodajP')
  vidljivoDodajP: boolean;

  @Input('vidljivoIzmijeniP')
  vidljivoIzmijeniP: boolean;

  @Input('odabraniProizvodjac')
  odabraniProizvodjac: Proizvodjac = new Proizvodjac();

  @Input('odabraniModel')
  odabraniModel: Model = new Model();

  @Input('dodajModelBtn')
  dodajModelBtn: boolean;

  @Input('dodajStatusBtn')
  dodajStatusBtn: boolean;

  @Input('odabraniStatus')
  odabraniStatus: Status = new Status();

  constructor(@Host() private parent: AutomobiliAdmComponent) { }

  ngOnInit(): void { }

  parentNgOnInit() {
    this.parent.ngOnInit();
  }

  parentKliknutoIzmUklOst() {
    this.parent.kliknutoIzmUklOst();
  }

}
