import { Component, OnInit, Host } from '@angular/core';
import { Model } from 'src/app/models/Model';
import { ModeliService } from 'src/app/services/modeli.service';
import { ProModStaAdmComponent } from '../pro-mod-sta-adm/pro-mod-sta-adm.component';

@Component({
  selector: 'app-model-adm',
  templateUrl: './model-adm.component.html',
  styleUrls: ['./model-adm.component.scss']
})
export class ModelAdmComponent implements OnInit {

  model: Model = new Model();

  constructor(private modeliService: ModeliService, 
              @Host() private parent: ProModStaAdmComponent) { }

  ngOnInit(): void {
  }

  dodajModel() {
    if (confirm('Da li zaista zelite da dodate novo oznaku modela?')) {
      this.modeliService.insertModel(this.model).subscribe(data => {
        if (data.status === 0) {
          alert('Nova oznaka modela je dodata u bazu podataka!');
          this.parent.parentNgOnInit();
        }
        else {
          alert('Doslo je do greske prilikom upisivanja u bazu podataka!');
        }
      });
    }
  }

}

