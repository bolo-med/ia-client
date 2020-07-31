import { Component, OnInit, Host } from '@angular/core';
import { StatusiService } from 'src/app/services/statusi.service';
import { ProModStaAdmComponent } from '../pro-mod-sta-adm/pro-mod-sta-adm.component';
import { Status } from 'src/app/models/Status';

@Component({
  selector: 'app-status-adm',
  templateUrl: './status-adm.component.html',
  styleUrls: ['./status-adm.component.scss']
})
export class StatusAdmComponent implements OnInit {

  status: Status = new Status();

  constructor(private statusiService: StatusiService, 
              @Host() private parent: ProModStaAdmComponent) { }

  ngOnInit(): void {
  }

  dodajStatus() {
    if (confirm('Da li stvarno zelite da dodate nov status?')) {
      this.statusiService.insertStatus(this.status).subscribe(data => {
        if (data.status === 0) {
          alert('Nov status je dodat u bazu podataka!');
          this.parent.parentNgOnInit();
        }
        else {
          alert('Doslo je do greske prilikom upisivanja u bazu podataka!');
        }
      });
    }
  }

}