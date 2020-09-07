import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rezervacija } from 'src/app/models/Rezervacija';

@Component({
  selector: 'app-rezervacije-adm-ist-kor',
  templateUrl: './rezervacije-adm-ist-kor.component.html',
  styleUrls: ['./rezervacije-adm-ist-kor.component.scss']
})
export class RezervacijeAdmIstKorComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  @Input('rezervacijaOdabrana')
  rezervacijaOdabrana: Rezervacija;

  constructor() { }

  ngOnInit(): void {
  }

}
