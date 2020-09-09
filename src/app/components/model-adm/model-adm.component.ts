import { Component, OnInit, Host, Input } from '@angular/core';
import { Model } from 'src/app/models/Model';
import { ModeliService } from 'src/app/services/modeli.service';
import { ProModStaAdmComponent } from '../pro-mod-sta-adm/pro-mod-sta-adm.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-model-adm',
  templateUrl: './model-adm.component.html',
  styleUrls: ['./model-adm.component.scss']
})
export class ModelAdmComponent implements OnInit {

  // model: Model = new Model();

  @Input('odabraniModel')
  model: Model = new Model();

  @Input('dodajModelBtn')
  dodajModelBtn: boolean;

  constructor(private modeliService: ModeliService, 
              @Host() private parent: ProModStaAdmComponent, 
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  dodajModel() {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {

      if (this.model.oznaka === undefined || this.model.oznaka.trim() === "") {
        alert('Popunite polje!');
      }
      else {
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
    else {
      alert('Doslo je do greske pri upisivanju u bazu podataka!');
    }
  }

  izmijeniModel() {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      if (confirm('Da li zelite da izmijenite oznaku modela?')) {
        this.modeliService.updateModel(this.model).subscribe(data => {
          if (data.status === 0) {
            alert('Oznaka modela je izmijenjena!');
            this.parent.parentKliknutoIzmUklOst();
          }
          else {
            alert('Doslo je do neke greske!');
            this.parent.parentKliknutoIzmUklOst();
          }
        });
        // this.parent.parentKliknutoIzmUklOst(); // Nece da je pozove odavde.
      }
    }
    else {
      alert('Doslo je do greske pri upisivanju u bazu podataka!');
    }
  }

}

