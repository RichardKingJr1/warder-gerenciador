import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { usuarioType } from 'src/app/interfaces/usuario';
import { MonitoradorService } from '../../services/monitorador.service';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-tabela-usuarios',
  templateUrl: './tabela-usuarios.component.html',
  styleUrls: ['./tabela-usuarios.component.css']
})
export class TabelaUsuariosComponent implements OnInit {

  //filtro dos trackings
  public chaveFiltro: string | null = null;
  public usuarios: usuarioType[] = [];

  constructor(private webSocketService:WebSocketService, private _monitorador: MonitoradorService) { }

  @ViewChild('audioTempo', {static: false}) audioTempo!: ElementRef;
  @ViewChild('audioDisconnect', {static: false}) audioDisconnect!: ElementRef;
  @ViewChild('audioSinal', {static: false}) audioSinal!: ElementRef;
  @ViewChild('audioRota', {static: false}) audioRota!: ElementRef;
  @ViewChild('audioMinimizado', {static: false}) audioMinimizado!: ElementRef;

  ngOnInit(): void {
    this.monitorarUsuarios()

    this.handleMinimize();
    this.handleTempo();
  }

  monitorarUsuarios(){
    this._monitorador.busca().subscribe((data) =>{
      this.usuarios = data;
    })
  }

  handleMinimize(){
    //começa a ouvir por alertas de minimizado e atualizações de status caso o usuario minimize ou maximize
    this.webSocketService.listen('minimizadoMaximizado').subscribe((data: any) => {
      
      //this.ultimos_usuarios = this.usuarios;
      this.usuarios = data[0];
      console.log('minimizadoMaximizado');

      if(data[1] == true){
        console.log('minimizado aconteceu');
        this.audioMinimizado.nativeElement.play();
      }
    });
  }

  handleTempo(){
    //começa a ouvir por alertas de extrapolação de tempo
    this.webSocketService.listen('ultrapassouTempo').subscribe((data: any) => {

      this.usuarios = data;
      console.log('ultrapassouTempo');

      this.audioTempo.nativeElement.play();
    });
  }

  finalizarTracking(id:string){
    console.log(id);
    this.webSocketService.emit('admDisconnect', id);
  }

}
