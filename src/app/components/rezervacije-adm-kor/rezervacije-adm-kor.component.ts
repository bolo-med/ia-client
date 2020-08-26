import { Component, OnInit, Input } from '@angular/core';
import { Rezervacija } from 'src/app/models/Rezervacija';

@Component({
  selector: 'app-rezervacije-adm-kor',
  templateUrl: './rezervacije-adm-kor.component.html',
  styleUrls: ['./rezervacije-adm-kor.component.scss']
})
export class RezervacijeAdmKorComponent implements OnInit {

  @Input('rezervacijaOdabrana')
  rezervacijaOdabrana: Rezervacija;

  constructor() { }

  ngOnInit(): void {
  }

}
