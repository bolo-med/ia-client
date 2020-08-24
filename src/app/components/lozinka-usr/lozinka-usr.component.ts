import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/Korisnik';
import { KorisniciService } from './../../services/korisnici.service'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lozinka-usr',
  templateUrl: './lozinka-usr.component.html',
  styleUrls: ['./lozinka-usr.component.scss']
})
export class LozinkaUsrComponent implements OnInit {

  korisnik: Korisnik;
  korisnikID: number;

  constructor(private korisniciServices: KorisniciService, 
              private authService: AuthService) {}

  ngOnInit(): void {
    this.korisnikID = this.authService.getKorisnikDetails().id;
    this.korisniciServices.getKorisnikByID(this.korisnikID).subscribe(data => {
      this.korisnik = data;
      
    });
  }

}
