import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  /*dados do usuario*/
  public token: string | null = null;
  public email: string | null = null;

  public endereco: string = 'https://ee08drf0j1.execute-api.us-east-2.amazonaws.com/prod';

  constructor() {}

  //logar(id_usuario: number, email: string, senha: string){
  logar(token: string, email: string){
    this.email = email;
    this.token = token;
    //this.visivelGlobal.visivelChangeLogado(true);
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    //localStorage.setItem('senha', senha);
  }

  deslogar(){
    this.email = null;
    this.token = null;
    //this.visivelGlobal.visivelChangeLogado(false);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    //localStorage.removeItem("senha");
  }

}
