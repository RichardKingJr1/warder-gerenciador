import { Component, OnInit } from '@angular/core';
import { usuarioType } from 'src/app/interfaces/usuario';
import { MonitoradorService } from './services/monitorador.service';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public usuarios: usuarioType[] = [];

  constructor(private webSocketService:WebSocketService, private _monitorador: MonitoradorService) { }

  ngOnInit(): void {
    //testa se ouve uma conexão ou uma reconexão, caso ocorra avisa o server quem é o userMaster
    this.conexao();
    this.monitorarUsuarios()
  }

  conexao(){
    this.webSocketService.listen('connect').subscribe((data) => {
      this.webSocketService.emit('userMaster', 'a');
    });
  }
  
  monitorarUsuarios(){
    this._monitorador.busca().subscribe((data) =>{
      this.usuarios = data;
    })
  }

}
