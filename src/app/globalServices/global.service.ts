import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  /*dados do usuario*/
  public logado: boolean = false;
  public id_usuario: any;

  public endereco: string = 'https://ee08drf0j1.execute-api.us-east-2.amazonaws.com/prod';

  constructor() {}

  logar(id_usuario: number, email: string, senha: string){
    this.id_usuario = id_usuario;
    this.logado = true;
    //this.visivelGlobal.visivelChangeLogado(true);
    localStorage.setItem('email', email);
    localStorage.setItem('senha', senha);
  }

  deslogar(){
    this.id_usuario = null;
    this.logado = false;
    //this.visivelGlobal.visivelChangeLogado(false);
    localStorage.removeItem("email");
    localStorage.removeItem("senha");
  }

}
