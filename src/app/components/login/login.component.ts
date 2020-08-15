import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/Korisnik';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();

  constructor(private authService: AuthService, 
              private router: Router) { }

  ngOnInit(): void {}

  login() {
    this.authService.login(this.korisnik).subscribe(data => {
      if (data.status === 0) {
        window.localStorage.setItem('ia-token', data.token);
        this.router.navigateByUrl('/');
      }
      else {
        alert('Neuspješno prijavljivanje!');
      }
    });
  }

}
