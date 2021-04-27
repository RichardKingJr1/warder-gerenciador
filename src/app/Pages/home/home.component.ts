import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private webSocketService:WebSocketService) { }

  ngOnInit(): void {
    //testa se ouve uma conexão ou uma reconexão, caso ocorra avisa o server quem é o userMaster
    this.conexao();
  }

  conexao(){
    this.webSocketService.listen('connect').subscribe((data) => {
      this.webSocketService.emit('userMaster', 'a');
    });
  }

}
