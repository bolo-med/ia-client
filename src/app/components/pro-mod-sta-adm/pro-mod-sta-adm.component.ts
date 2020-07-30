import { Component, OnInit, Host } from '@angular/core';
import { AutomobiliAdmComponent } from '../automobili-adm/automobili-adm.component';

@Component({
  selector: 'app-pro-mod-sta-adm',
  templateUrl: './pro-mod-sta-adm.component.html',
  styleUrls: ['./pro-mod-sta-adm.component.scss']
})
export class ProModStaAdmComponent implements OnInit {

  constructor(@Host() private parent: AutomobiliAdmComponent) { }

  ngOnInit(): void { }

  parentNgOnInit() {
    this.parent.ngOnInit();
  }

}
