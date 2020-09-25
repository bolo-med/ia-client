import { Component, OnInit, Input, Host } from '@angular/core';
import { Proizvodjac } from 'src/app/models/Proizvodjac';
import { Model } from 'src/app/models/Model';
import { Status } from 'src/app/models/Status';
import { Automobil } from 'src/app/models/Automobil';
import { AutomobiliService } from 'src/app/services/automobili.service';
import { AutomobiliAdmComponent } from '../automobili-adm/automobili-adm.component';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-automobil-obrazac-adm',
  templateUrl: './automobil-obrazac-adm.component.html',
  styleUrls: ['./automobil-obrazac-adm.component.scss']
})
export class AutomobilObrazacAdmComponent implements OnInit {

  apiUrl = environment.apiUrl;

  putnici: number[];
  godista: number[];

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

  @Input('dodajAutomobilBtn')
  dodajAutomobilBtn: boolean;

  @Input('odabraniAutomobil')
  automobil: Automobil;

  constructor(private automobiliService: AutomobiliService, 
              @Host() private parent: AutomobiliAdmComponent, 
              private authService: AuthService) {}

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

    this.putnici = [1, 2, 3, 4, 5, 6, 7, 8];
    this.godistaFn();
  }

  dodajAutomobil() {

    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() 
                                                && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      
      if (this.automobil.proizvodjacID === undefined || 
          this.automobil.modelID === undefined || 
          this.automobil.godiste === undefined || 
          this.automobil.motor === undefined || 
          this.automobil.motor.trim() === "" || 
          this.automobil.brPutnika === undefined || 
          this.automobil.statusID === undefined || 
          this.automobil.cijena === undefined || 
          this.automobil.cijena === NaN || 
          this.uploader.progress === 0) {

        alert('Morate popuniti sva polja!');
      }
      else {
        if (confirm('Jeste li sigurni?')) {

          this.automobil.id = null;
          if (this.automobil.automatskiMjenjac === undefined) this.automobil.automatskiMjenjac = false;
          
          this.automobiliService.insertAutomobil(this.automobil).subscribe(data => {
            if (data.status === 0) {
              alert('Automobil je dodat u bazu podataka!');
              this.parent.ngOnInit();
              this.ngOnInit();
            }
            else if (data.status === -1) {
              alert('Doslo je do greske pri dodavanju automobila!');
            }
            else {
              alert('Doslo je do neke greske! Pokusali ste da unesete automobil.');
            }
          });
        }
      }
    }
    else {
      alert("Nemate administratorska prava!");
    }
  }

  toNumber() {
    this.automobil.proizvodjacID = (+this.automobil.proizvodjacID);
    this.automobil.modelID = (+this.automobil.modelID);
    this.automobil.statusID = (+this.automobil.statusID);
    this.automobil.godiste = (+this.automobil.godiste);
    this.automobil.cijena = (+this.automobil.cijena);
    this.automobil.brPutnika = (+this.automobil.brPutnika);
  }

  izmijenijAutomobil() {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() 
                                                && (this.authService.getKorisnikDetails().isAdmin === 1)) {

      if (confirm('Da li zelite da izmijenite automobil?')) {
        this.automobiliService.updateAutomobil(this.automobil).subscribe(data => {
          if (data.status === 0) {
            alert('Automobil je izmijenjen!');
            this.parent.kliknutoIzmUkl();
          }
          else {
            alert('Doslo je do neke greske!');
            this.parent.kliknutoIzmUkl();
          }
        });
      }
    }
    else {
      alert('Nemate administratorska prava!');
    }
  }

  godistaFn() {
    this.godista = [];
    let tekucaGodina = +(new Date().toISOString().substring(0, 4));
    for (let i: number = tekucaGodina ; i >= (tekucaGodina - 40); i--) {
      this.godista.push(i);
    }
  }

}
