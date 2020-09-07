import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutomobiliComponent } from './components/automobili/automobili.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AutomobilComponent } from './components/automobil/automobil.component';
import { AutomobiliAdmComponent } from './components/automobili-adm/automobili-adm.component';
import { AktuelnoUsrComponent } from './components/aktuelno-usr/aktuelno-usr.component';
import { IstorijaUsrComponent } from './components/istorija-usr/istorija-usr.component';
import { LozinkaUsrComponent } from './components/lozinka-usr/lozinka-usr.component';
import { RezervacijeAdmComponent } from './components/rezervacije-adm/rezervacije-adm.component';
import { KorisniciAdmComponent } from './components/korisnici-adm/korisnici-adm.component';


const routes: Routes = [
  {
    path: '',
    component: AutomobiliComponent
  },
  {
    path: 'automobili',
    component: AutomobiliComponent
  },
  {
    path: 'automobil/:id',
    component: AutomobilComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'automobili-adm',
    component: AutomobiliAdmComponent
  },
  {
    path: 'aktuelno-usr',
    component: AktuelnoUsrComponent
  },
  {
    path: 'istorija-usr',
    component: IstorijaUsrComponent
  },
  {
    path: 'lozinka-usr',
    component: LozinkaUsrComponent
  },
  {
    path: 'rezervacije-adm',
    component: RezervacijeAdmComponent
  },
  {
    path: 'korisnici-adm',
    component: KorisniciAdmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
