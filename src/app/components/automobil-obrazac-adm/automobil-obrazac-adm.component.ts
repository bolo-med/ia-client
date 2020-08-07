import { Component, OnInit, Input, Host } from '@angular/core';
import { Proizvodjac } from 'src/app/models/Proizvodjac';
import { Model } from 'src/app/models/Model';
import { Status } from 'src/app/models/Status';
import { Automobil } from 'src/app/models/Automobil';
import { AutomobiliService } from 'src/app/services/automobili.service';
import { AutomobiliAdmComponent } from '../automobili-adm/automobili-adm.component';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-automobil-obrazac-adm',
  templateUrl: './automobil-obrazac-adm.component.html',
  styleUrls: ['./automobil-obrazac-adm.component.scss']
})
export class AutomobilObrazacAdmComponent implements OnInit {

  automobil: Automobil = new Automobil();

  apiUrl = environment.apiUrl;

  uploader: FileUploader = new FileUploader({
    itemAlias: 'img',
    url: `${this.apiUrl}/upload`
  });

  @Input('proizvodjaci')
  proizvodjaci: Proizvodjac[] = [];

  @Input('modeli')
  modeli: Model[] = [];

  @Input('statusi')
  statusi: Status[] = [];

  constructor(private automobiliService: AutomobiliService, 
              @Host() private parent: AutomobiliAdmComponent) { }

  ngOnInit(): void {

    this.uploader.onAfterAddingAll = (file) => {
      file.withCredentials = false;
      this.uploader.uploadAll();
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      response = JSON.parse(response);
      if(response.status === 0) {
        alert('Fajl je aploudovan!');
        this.automobil.fotografija = response.filename;
      }
      else {
        alert('Fajl nije aploudovan!');
      }
    };

  }

  dodajAutomobil() {
    if (confirm('Jeste li sigurni?')) {
      this.automobiliService.insertAutomobil(this.automobil).subscribe(data => {
        if (data.status === 0) {
          alert('Automobil je dodat u bazu podataka!');
          this.parent.ngOnInit();
        }
        else {
          alert('Doslo je do greske!');
        }
      });
    }
  }

  toNumber() {
    this.automobil.proizvodjacID = (+this.automobil.proizvodjacID);
    this.automobil.modelID = (+this.automobil.modelID);
    this.automobil.statusID = (+this.automobil.statusID);
    this.automobil.godiste = (+this.automobil.godiste);
    this.automobil.cijena = (+this.automobil.cijena);
  }

}
