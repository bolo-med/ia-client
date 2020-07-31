import { Component, OnInit, Input, Host } from '@angular/core';
import { Status } from 'src/app/models/Status';
import { StatusiService } from 'src/app/services/statusi.service';
import { AutomobiliAdmComponent } from '../automobili-adm/automobili-adm.component';

@Component({
  selector: 'app-statusi-tabela',
  templateUrl: './statusi-tabela.component.html',
  styleUrls: ['./statusi-tabela.component.scss']
})
export class StatusiTabelaComponent implements OnInit {

  @Input('statusi')
  statusi: Status[] = [];

  constructor(private statusiService: StatusiService, 
              @Host() private parent: AutomobiliAdmComponent) { }

  ngOnInit(): void {
  }

  ukloniStatus(status: Status) {
    if (confirm('Da li zelite da uklonite status?')) {
      this.statusiService.deleteStatus(status.id).subscribe(data => {
        if (data.status === 0) {
          alert('Status je uklonjen iz baze podataka!');
          this.parent.ngOnInit();
        }
        else {
          alert('Doslo je do greske pri uklanjanju iz baze podataka!');
        }
      });
    }
  }

}
