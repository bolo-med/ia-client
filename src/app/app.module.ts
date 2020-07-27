import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AutomobiliComponent } from './components/automobili/automobili.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AutomobilComponent } from './components/automobil/automobil.component';

@NgModule({
  declarations: [
    AppComponent,
    AutomobiliComponent,
    LoginComponent,
    RegisterComponent,
    AutomobilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
