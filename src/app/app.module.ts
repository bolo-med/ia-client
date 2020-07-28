import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AutomobiliComponent } from './components/automobili/automobili.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AutomobilComponent } from './components/automobil/automobil.component';
import { AutomobiliTableComponent } from './components/automobili-table/automobili-table.component';
import { AutomobiliAdmComponent } from './components/automobili-adm/automobili-adm.component';
import { AutomobilObrazacAdmComponent } from './components/automobil-obrazac-adm/automobil-obrazac-adm.component';
import { AutomobiliTabelaAdmComponent } from './components/automobili-tabela-adm/automobili-tabela-adm.component';

@NgModule({
  declarations: [
    AppComponent,
    AutomobiliComponent,
    LoginComponent,
    RegisterComponent,
    AutomobilComponent,
    AutomobiliTableComponent,
    AutomobiliAdmComponent,
    AutomobilObrazacAdmComponent,
    AutomobiliTabelaAdmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
