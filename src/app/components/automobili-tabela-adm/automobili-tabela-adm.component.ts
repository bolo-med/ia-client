import { Component, OnInit, Input, Host } from '@angular/core';
import { Automobil } from '../../models/Automobil';
import { AutomobiliAdmComponent } from '../automobili-adm/automobili-adm.component';

@Component({
  selector: 'app-automobili-tabela-adm',
  templateUrl: './automobili-tabela-adm.component.html',
  styleUrls: ['./automobili-tabela-adm.component.scss']
})
export class AutomobiliTabelaAdmComponent implements OnInit {

  @Input('automobili')
  automobili: Automobil[] = [];

  constructor(@Host() private parent: AutomobiliAdmComponent) { }

  ngOnInit(): void {
  }

  ukloniAutomobil(automobil: Automobil) {
    this.parent.ukloniAutomobil(automobil);
  }

}
