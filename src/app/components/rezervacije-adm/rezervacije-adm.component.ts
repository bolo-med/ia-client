import { Component, OnInit } from '@angular/core';
import { Rezervacija } from 'src/app/models/Rezervacija';
import { RezervacijeService } from 'src/app/services/rezervacije.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rezervacije-adm',
  templateUrl: './rezervacije-adm.component.html',
  styleUrls: ['./rezervacije-adm.component.scss']
})
export class RezervacijeAdmComponent implements OnInit {

  odabrano: boolean;
  rezervacijeSve: Rezervacija[];

  constructor(private rezervacijeService: RezervacijeService, 
              private authService: AuthService) { }

  ngOnInit(): void {

    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() 
                                                && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      this.odabrano = true;
      this.rezervacijeSve = [];
  
      this.rezervacijeService.getRezervacije().subscribe(data => {
        this.rezervacijeSve = data;
      });
    }
    else {
      alert('Nemate administratorska prava!');
    }

  }

  kliknutoA() {
    this.odabrano = true;
  }

  kliknutoI() {
    this.odabrano = false;
  }

}
