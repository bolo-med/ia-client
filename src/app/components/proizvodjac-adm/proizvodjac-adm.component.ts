import { Component, OnInit, Host } from '@angular/core';
import { ProizvodjaciService } from 'src/app/services/proizvodjaci.service';
import { Proizvodjac } from 'src/app/models/Proizvodjac';
import { ProModStaAdmComponent } from '../pro-mod-sta-adm/pro-mod-sta-adm.component';

@Component({
  selector: 'app-proizvodjac-adm',
  templateUrl: './proizvodjac-adm.component.html',
  styleUrls: ['./proizvodjac-adm.component.scss']
})
export class ProizvodjacAdmComponent implements OnInit {

  proizvodjac: Proizvodjac = new Proizvodjac();

  constructor(private proizvodjaciService: ProizvodjaciService, 
              @Host() private parent: ProModStaAdmComponent) { }

  ngOnInit(): void {
  }

  klikNaDugme() {
    if (confirm('Jeste li sigurni da zelite da dodate novog proizvodjaca u bazu podataka?')) {
      this.proizvodjaciService.insertProizvodjac(this.proizvodjac).subscribe(data => {
        if (data.status === 0) {
          alert('Nov proizvodjac je dodat u bazu podataka!');
          this.parent.parentNgOnInit();
        }
        else {
          alert('Doslo je do greske pri upisivanju u bazu podataka!');
        }
      });
    }
  }
}
