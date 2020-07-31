import { Component, OnInit, Input, Host } from '@angular/core';
import { Model } from 'src/app/models/Model';
import { ModeliService } from 'src/app/services/modeli.service';
import { AutomobiliAdmComponent } from '../automobili-adm/automobili-adm.component';

@Component({
  selector: 'app-modeli-tabela',
  templateUrl: './modeli-tabela.component.html',
  styleUrls: ['./modeli-tabela.component.scss']
})
export class ModeliTabelaComponent implements OnInit {

  @Input('modeli')
  modeli: Model[] = [];

  constructor(private modeliService: ModeliService, 
              @Host() private parent: AutomobiliAdmComponent) { }

  ngOnInit(): void {
  }

  ukloniModel(model: Model) {
    if (confirm('Da li zelite da uklonite model?')) {
      this.modeliService.deleteModel(model.id).subscribe(data => {
        if (data.status === 0) {
          alert('Model je uklonjen uz baze podataka!');
          this.parent.ngOnInit();
        }
        else {
          alert('Doslo je do greske pri uklanjanju iz baze podataka!');
        }
      });
    }
  }

}
