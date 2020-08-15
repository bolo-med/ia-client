import { Component, OnInit } from '@angular/core';
import { Korisnik } from './../../models/Korisnik';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();

  constructor(private authService: AuthService, 
              private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    if (confirm('Da li ste sigurni da želite da se REGISTRUJETE?')) {
      this.authService.register(this.korisnik).subscribe(data => {
        if (data.status === 0) {
          window.localStorage.setItem('ia-token', data.token);
          // alert('Uspješna registracija!');
          this.router.navigateByUrl('/');
        }
        else {
          alert('Neuspješan pokušaj registrovanja!');
        }
      });
    }
  }

  toNumber() {
    this.korisnik.godRodjenja = (+this.korisnik.godRodjenja);
  }

}
