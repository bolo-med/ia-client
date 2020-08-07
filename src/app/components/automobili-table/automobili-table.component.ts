import { Component, OnInit, Input, Host } from '@angular/core';
import { Automobil } from 'src/app/models/Automobil';
import { AutomobiliComponent } from '../automobili/automobili.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-automobili-table',
  templateUrl: './automobili-table.component.html',
  styleUrls: ['./automobili-table.component.scss']
})
export class AutomobiliTableComponent implements OnInit {

  apiUrl = environment.apiUrl;

  @Input('automobili')
  automobili: Automobil[];

  constructor(@Host() private parent: AutomobiliComponent) { }

  ngOnInit(): void {
  }

  // private selektujAutomobil(a: Automobil) {
  //   // alert(a.model);
  //   this.parent.selektovaniAutomobil = a;
  // }

}
