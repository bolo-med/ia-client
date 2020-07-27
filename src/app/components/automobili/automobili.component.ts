import { Component, OnInit } from '@angular/core';
import { Automobil } from './../../models/Automobil';
import { AutomobiliService } from './../../services/automobili.service';

@Component({
  selector: 'app-automobili',
  templateUrl: './automobili.component.html',
  styleUrls: ['./automobili.component.scss']
})
export class AutomobiliComponent implements OnInit {

  naslovStranice = "Spisak svih automobila";
  automobili: Automobil[] = [];
  selektovaniAutomobil: Automobil;

  constructor(private automobiliService: AutomobiliService) { }

  ngOnInit(): void {

    this.automobiliService.getAutomobili().subscribe(data => {
      this.automobili = data;
    });

  }

}
