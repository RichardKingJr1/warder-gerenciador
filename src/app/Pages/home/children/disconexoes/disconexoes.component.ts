import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-disconexoes',
  templateUrl: './disconexoes.component.html',
  styleUrls: ['./disconexoes.component.css']
})
export class DisconexoesComponent implements OnInit {

  public disconnects: any = [];

  constructor(private webSocketService:WebSocketService) { }

  @ViewChild('audioDisconnect', {static: false}) audioDisconnect!: ElementRef;

  ngOnInit(): void {
    
    this.disconexoes();

  }

  //busca desconexões por parte do usuario -> move essas desconexoes para a lista de usuarios auto desconectados
  //começa a ouvir por desconexoes por ping timeout
  disconexoes(){
    this.webSocketService.listen('userDisconneted').subscribe((data:any) => {
      this.disconnects.push(data);
      this.audioDisconnect.nativeElement.play(); 
      console.log('o usuario se desconectou');
      console.log(this.disconnects);
    })
  }

  //exclui o aviso de disconnect 
  excluirDisconnect(index: number){
    this.disconnects.splice(index, 1);
  }
}
