import { Component, OnInit, Input } from '@angular/core';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rezervacije-adm-aut',
  templateUrl: './rezervacije-adm-aut.component.html',
  styleUrls: ['./rezervacije-adm-aut.component.scss']
})
export class RezervacijeAdmAutComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  @Input('rezervacijaOdabrana')
  rezervacijaOdabrana: Rezervacija;

  constructor() { }

  ngOnInit(): void {
  }

}
