import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { SolicitacoesComponent } from './Pages/home/children/solicitacoes/solicitacoes.component';

import { FormsModule } from '@angular/forms';
import { FiltroPipe } from './Pages/home/services/filtro.pipe';
import { TabelaUsuariosComponent } from './Pages/home/children/tabela-usuarios/tabela-usuarios.component';
import { DisconexoesComponent } from './Pages/home/children/disconexoes/disconexoes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SolicitacoesComponent,
    FiltroPipe,
    TabelaUsuariosComponent,
    DisconexoesComponent
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
