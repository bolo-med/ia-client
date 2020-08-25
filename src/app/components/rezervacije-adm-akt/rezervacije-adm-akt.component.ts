import { Component, OnInit, Input } from '@angular/core';
import { Rezervacija } from 'src/app/models/Rezervacija';

@Component({
  selector: 'app-rezervacije-adm-akt',
  templateUrl: './rezervacije-adm-akt.component.html',
  styleUrls: ['./rezervacije-adm-akt.component.scss']
})
export class RezervacijeAdmAktComponent implements OnInit {

  rezervacijeAktuelne: Rezervacija[];
  rezervacijeAktuelneAbc: Rezervacija[];

  @Input('rezervacijeSve')
  rezervacijeSve: Rezervacija[];

  constructor() { }

  ngOnInit(): void {

    this.rezervacijeAktuelne = this.rezervacijeAktuelneFn();
    this.rezervacijeAktuelneAbc = this.rezervacijeAktuelneAbcFn();

  }

  rezervacijeAktuelneFn(): Rezervacija[] {
    let r: Rezervacija[] = this.rezervacijeSve;
    let rAkt: Rezervacija[] = [];
    for (let i = 0; i < this.rezervacijeSve.length; i++) {
      if ((r[i].datumStvarnogVracanja === null) && !(r[i].realizovana === false)) {
        rAkt.push(r[i]);
      }
    }
    return rAkt;
  }

  rezervacijeAktuelneAbcFn(): Rezervacija[] {
    let r: Rezervacija[] = this.rezervacijeAktuelne;
    let rAbc: Rezervacija[] = [];
    rAbc = r.sort((a, b) => {
      let datA: Date = new Date(a.datumPreuzimanja);
      let datB: Date = new Date(b.datumPreuzimanja);
      let datAStr: string = datA.toISOString().split('T')[0];
      let datBStr: string = datB.toISOString().split('T')[0];
      if (datAStr < datBStr) {
        return -1;
      }
      else if (datAStr > datBStr) {
        return 1;
      }
      else {
        return 0;
      }
    });
    return rAbc;
  }

}
