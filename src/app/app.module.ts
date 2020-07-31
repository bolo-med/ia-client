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
import { ProModStaAdmComponent } from './components/pro-mod-sta-adm/pro-mod-sta-adm.component';
import { ProizvodjacAdmComponent } from './components/proizvodjac-adm/proizvodjac-adm.component';
import { ModelAdmComponent } from './components/model-adm/model-adm.component';
import { StatusAdmComponent } from './components/status-adm/status-adm.component';
import { ProizvodjaciTabelaComponent } from './components/proizvodjaci-tabela/proizvodjaci-tabela.component';
import { ModeliTabelaComponent } from './components/modeli-tabela/modeli-tabela.component';
import { StatusiTabelaComponent } from './components/statusi-tabela/statusi-tabela.component';

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
    StatusiTabelaComponent
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
