import { Component, OnInit, Input } from '@angular/core';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rezervacije-adm-ist-aut',
  templateUrl: './rezervacije-adm-ist-aut.component.html',
  styleUrls: ['./rezervacije-adm-ist-aut.component.scss']
})
export class RezervacijeAdmIstAutComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  @Input('rezervacijaOdabrana')
  rezervacijaOdabrana: Rezervacija;

  constructor() { }

  ngOnInit(): void {
  }

}
