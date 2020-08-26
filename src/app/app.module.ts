import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';

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
import { ProModStaAdmComponent } from './components/pro-mod-sta-adm/pro-mod-sta-adm.component';
import { ProizvodjacAdmComponent } from './components/proizvodjac-adm/proizvodjac-adm.component';
import { ModelAdmComponent } from './components/model-adm/model-adm.component';
import { StatusAdmComponent } from './components/status-adm/status-adm.component';
import { ProizvodjaciTabelaComponent } from './components/proizvodjaci-tabela/proizvodjaci-tabela.component';
import { ModeliTabelaComponent } from './components/modeli-tabela/modeli-tabela.component';
import { StatusiTabelaComponent } from './components/statusi-tabela/statusi-tabela.component';
import { IznajmljivanjeUsrComponent } from './components/iznajmljivanje-usr/iznajmljivanje-usr.component';
import { AutomobilDetaljiComponent } from './components/automobil-detalji/automobil-detalji.component';
import { AktuelnoUsrComponent } from './components/aktuelno-usr/aktuelno-usr.component';
import { IstorijaUsrComponent } from './components/istorija-usr/istorija-usr.component';
import { LozinkaUsrComponent } from './components/lozinka-usr/lozinka-usr.component';
import { RezervacijeAdmComponent } from './components/rezervacije-adm/rezervacije-adm.component';
import { RezervacijeAdmAktComponent } from './components/rezervacije-adm-akt/rezervacije-adm-akt.component';
import { RezervacijeAdmIstComponent } from './components/rezervacije-adm-ist/rezervacije-adm-ist.component';
import { RezervacijeAdmAutComponent } from './components/rezervacije-adm-aut/rezervacije-adm-aut.component';
import { RezervacijeAdmKorComponent } from './components/rezervacije-adm-kor/rezervacije-adm-kor.component';

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
    AutomobiliTabelaAdmComponent,
    ProModStaAdmComponent,
    ProizvodjacAdmComponent,
    ModelAdmComponent,
    StatusAdmComponent,
    ProizvodjaciTabelaComponent,
    ModeliTabelaComponent,
    StatusiTabelaComponent,
    IznajmljivanjeUsrComponent,
    AutomobilDetaljiComponent,
    AktuelnoUsrComponent,
    IstorijaUsrComponent,
    LozinkaUsrComponent,
    RezervacijeAdmComponent,
    RezervacijeAdmAktComponent,
    RezervacijeAdmIstComponent,
    RezervacijeAdmAutComponent,
    RezervacijeAdmKorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
