import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ia-client';

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
  
}

