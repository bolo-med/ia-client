import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { KorisniciService } from 'src/app/services/korisnici.service';
import { Korisnik } from 'src/app/models/Korisnik';
import { Router } from '@angular/router';
import { RezervacijeService } from 'src/app/services/rezervacije.service';
import { Rezervacija } from 'src/app/models/Rezervacija';

@Component({
  selector: 'app-korisnici-adm',
  templateUrl: './korisnici-adm.component.html',
  styleUrls: ['./korisnici-adm.component.scss']
})
export class KorisniciAdmComponent implements OnInit {

  korisniciSvi: Korisnik[];
  korisniciSviAbc: Korisnik[];
  korisnikProba: Korisnik;
  detalji: boolean;

  constructor(private authService: AuthService, 
              private korisniciService: KorisniciService, 
              private router: Router, 
              private rezervacijeService: RezervacijeService) {}

  ngOnInit(): void {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() 
                                                && (this.authService.getKorisnikDetails().isAdmin === 1)) {

      this.korisniciSvi = [];
      this.korisniciSviAbc = [];
      this.korisnikProba = new Korisnik();
      this.detalji = false;

      this.korisniciService.getKorisnici().subscribe(data => {
        this.korisniciSvi = data;
        this.korisniciSviAbc = this.korisniciAbcFn(this.korisniciSvi);
        this.korisnikProba = this.korisniciSviAbc[0];
      });
                                                
    }
    else {
      alert('Nemate administratorska prava!');
      this.router.navigateByUrl('/');
    }
  }

  korisniciAbcFn(kor: Korisnik[]): Korisnik[] {
    let korAbc: Korisnik[] = [];
    korAbc = kor.sort((a, b) => {
      let aPrez: string = a.prezime;
      let bPrez: string = b.prezime;
      if (aPrez < bPrez) {
        return -1;
      }
      else if (aPrez > bPrez) {
        return 1;
      }
      else {
        return 0;
      }
    });
    return korAbc;
  }

  detaljiFn(korisnikOdabrani: Korisnik) {
    this.korisniciSviAbc = [];
    this.korisniciSviAbc.push(korisnikOdabrani);
    this.detalji = true;
  }

  nazad() {
    this.ngOnInit();
  }

  prava(korOdabr: Korisnik) {
    let kor: Korisnik = new Korisnik();
    kor.id = korOdabr.id;
    if (korOdabr.isAdmin === 1) {
      kor.isAdmin = 0;
    }
    else if (korOdabr.isAdmin === 0) {
      kor.isAdmin = 1;
    }
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() 
                                                && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      
      this.korisniciService.updateKorisnik(kor).subscribe(data => {
        if (data.status === 0) {
          alert('Prava su promijenjena!');
          korOdabr.isAdmin = kor.isAdmin; // da odmah prikaze rezultat na stranici
        }
        else {
          alert('Greška pri promjeni prava!');
        }
        // this.ngOnInit();
      });
    }
    else {
      alert('Nemate administratorska prava!');
      this.router.navigateByUrl('/');
    }
  }

  lozinka(korOdabr: Korisnik) {
    let kor: Korisnik = new Korisnik();
    kor.id = korOdabr.id;
    kor.password = '123';
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() 
                                                && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      this.korisniciService.updateKorisnik(kor).subscribe(data => {
        if (data.status === 0) {
          alert('Lozinka je resetovana!');
        }
        else {
          alert('Greška pri resetovanju lozinke!');
        }
      });
    }
    else {
      alert('Nemate administratorska prava!');
      this.router.navigateByUrl('/');
    }
  }

  obrisi(korOdabr: Korisnik) {

    if (confirm('Da li želite da uklonite korisnika i sve njegove rezervacije?')) {

      if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() 
                                                && (this.authService.getKorisnikDetails().isAdmin === 1)) {

        let rezSve: Rezervacija[] = [];
        let rezKor: Rezervacija[] = [];
        
        this.rezervacijeService.getRezervacije().subscribe(data => {
          rezSve = data;
          rezKor = this.rezervacijePoKorisnikuFn(rezSve, korOdabr.id);
          if (rezKor.length > 0) {
            if (this.brisiRezervacije(rezKor) === true) {
              this.brisiKorisnika(korOdabr.id);
            }
          }
          else if (rezKor.length === 0) {
            this.brisiKorisnika(korOdabr.id);
          }
          else {
            console.log('Greska pri izdvajanju rezervacija datog korisnika.');
          }
        });
      }
      else {
        alert('Nemate administratorska prava!');
        this.router.navigateByUrl('/');
      }
    }
  }

  rezervacijePoKorisnikuFn(r: Rezervacija[], korID: number): Rezervacija[] {
    let rKor: Rezervacija[] = [];
    for (let i: number = 0; i < r.length; i++) {
      if (r[i].korisnikID === korID) {
        rKor.push(r[i]);
      }
    }
    return rKor;
  }

  brisiRezervacije(r: Rezervacija[]): boolean {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      for (let i: number = 0; i < r.length; i++) {
        this.rezervacijeService.deleteRezervacija(r[i].id).subscribe(data => {
          if (data.status !== 0) {
            alert('Greška pri brisanju reyervacija!');
            return false; // brisanje se nije izvrsilo
          }
        });
      }
      return true; // uspjesno obrisane rezervacije
    }
    else {
      alert('Nemate administratorska prava!');
      this.router.navigateByUrl('/');
    }
  }

  brisiKorisnika(korID: number) {
    if (window.localStorage.getItem('ia-token') && this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {
      this.korisniciService.deleteKorisnik(korID).subscribe(data => {
        if (data.status === 0) {
          alert('Korisnik je izbrisan!');
        }
        else {
          alert('Greška pri brisanju korisnika!')
        }
        this.ngOnInit();
      });
    }
    else {
      alert('Nemate administratorska prava!');
      this.router.navigateByUrl('/');
    }
  }

}
