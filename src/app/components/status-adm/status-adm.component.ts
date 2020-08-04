import { Component, OnInit, Host, Input } from '@angular/core';
import { StatusiService } from 'src/app/services/statusi.service';
import { ProModStaAdmComponent } from '../pro-mod-sta-adm/pro-mod-sta-adm.component';
import { Status } from 'src/app/models/Status';

@Component({
  selector: 'app-status-adm',
  templateUrl: './status-adm.component.html',
  styleUrls: ['./status-adm.component.scss']
})
export class StatusAdmComponent implements OnInit {

  @Input('dodajStatusBtn')
  dodajStatusBtn: boolean;

  @Input('odabraniStatus')
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
        }
        else {
          alert('Doslo je do greske prilikom upisivanja u bazu podataka!');
        }
        this.parent.parentNgOnInit();
      });
    }
  }

  izmijeniStatus() {
    if (confirm('Da li zelite da izmijenite tip statusa?')) {
      this.statusiService.updateStatus(this.status).subscribe(data => {
        if (data.status === 0) {
          alert('Status je izmijenjen!');
          this.parent.parentKliknutoIzmUklOst();
        }
        else {
          alert('Doslo je do neke greske!');
          this.parent.parentKliknutoIzmUklOst();
        }
      });
      // this.parent.parentKliknutoIzmUklOst(); // Nece da je pozove odavde.
    }
  }

}
