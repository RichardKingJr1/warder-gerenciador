import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //variaveis de solicitacoes
  public solicitacoes: any; /////////////////adicionar tipagem
  public rg: string | null = null;

  constructor(private webSocketService:WebSocketService) { }

  ngOnInit(): void {
    //testa se ouve uma conexão ou uma reconexão, caso ocorra avisa o server quem é o userMaster
    this.conexao();

    this.buscarSolicitacao();


  }

  conexao(){
    this.webSocketService.listen('connect').subscribe((data) => {
      this.webSocketService.emit('userMaster', 'a');
    });
  }

  buscarSolicitacao(){
    this.webSocketService.listen('newRequest').subscribe((data) => {
      this.solicitacoes = data;
      console.log(data);
      console.log(this.rg);
    });
  }  

  /********* Solicitacoes **********/
  //exclui solicitacao
  excluirSolicitacao(id:string, rg:string){
    console.log(id);
    this.webSocketService.emit('deniedServer', id);    
    
    if(this.rg == rg){
      this.rg = null;
    };
  }

  //registra um RG selecionado nas solicitações
  selecionarRg(rg: string){
    this.rg = rg;
    console.log('Selecionou');
  }

}
