import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutomobiliComponent } from './components/automobili/automobili.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AutomobilComponent } from './components/automobil/automobil.component';
import { AutomobiliAdmComponent } from './components/automobili-adm/automobili-adm.component';
import { IznajmljivanjeUsrComponent } from './components/iznajmljivanje-usr/iznajmljivanje-usr.component';


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
    path: 'iznajmljivanje-usr',
    component: IznajmljivanjeUsrComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
