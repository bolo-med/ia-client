import { Component, OnInit, Input, Host } from '@angular/core';
import { Automobil } from 'src/app/models/Automobil';
import { AutomobiliComponent } from '../automobili/automobili.component';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-automobili-table',
  templateUrl: './automobili-table.component.html',
  styleUrls: ['./automobili-table.component.scss']
})
export class AutomobiliTableComponent implements OnInit {

  apiUrl = environment.apiUrl;

  @Input('automobili')
  automobili: Automobil[];

  constructor(@Host() private parent: AutomobiliComponent, 
              private router: Router) { }

  ngOnInit(): void { }

}
