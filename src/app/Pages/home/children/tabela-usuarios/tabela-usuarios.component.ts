import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { usuarioType } from 'src/app/interfaces/usuario';
import { DataAjusteService } from '../../services/data-ajuste.service';
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

  public dismiss_aviso = 20;

  constructor(private webSocketService:WebSocketService, private _monitorador: MonitoradorService, private _dataAjusteService: DataAjusteService) { }

  @ViewChild('audioTempo', {static: false}) audioTempo!: ElementRef;
  @ViewChild('audioSinal', {static: false}) audioSinal!: ElementRef;
  @ViewChild('audioRota', {static: false}) audioRota!: ElementRef;
  @ViewChild('audioMinimizado', {static: false}) audioMinimizado!: ElementRef;

  ngOnInit(): void {
    this.monitorarUsuarios()

    this.handleMinimize();
    this.handleTempo();
    this.handleTimeOut();
    this.handleReconect();
  }

  monitorarUsuarios(){
    this._monitorador.busca().subscribe((data) =>{
      this.usuarios = data;
    })
  }

  finalizarTracking(id:string){
    console.log(id);
    this.webSocketService.emit('admDisconnect', id);
  }



  /********** Alertas *************/
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

  handleTimeOut(){
    //começa a ouvir por alertas de ping timeout
    this.webSocketService.listen('pingTimeout').subscribe((data: any) => {
      
      this.usuarios = data;

      this.audioSinal.nativeElement.play();

      /* this.timeOut.push(data);
      if(this.ultimos_usuarios){
        for (const x of this.usuarios){
          //criar função que indica se algum dos tracking esta em ping timeout
          for (const z of this.timeOut){
            let foundIndex = this.usuarios.findIndex(h => h.id == z.id);
            if(foundIndex != -1){
              x.timeOut = true;
            };
          };
        };
      }; */

      console.log('ping timeout');
    })
  }

  handleReconect(){
    //ouve se o usuario se reconectou, se sim retira o timeout do do array de timeouts
    this.webSocketService.listen('alreadyConnected').subscribe((data: any) => {
      //this.timeOut = this.timeOut.filter(u => u.rg !== data);  
      this.usuarios = data;
    })
  }

  /*****  Excluir alertas *****/
  excluirAlertaTempo(rg:string, status:number){
    console.log('Alerta dismiss ok');
    let today = new Date();
    let dataObj = {
      rg: rg,
      status: status,
      tempo: this._dataAjusteService.ajustarHora(new Date(today.getTime() + this.dismiss_aviso*60000))
    };
    this.webSocketService.emit('dismissAlertraTempo', dataObj);    
  };

  excluirAlertaRota(rg:string){
    console.log('Alerta rota dismiss ok');
    this.webSocketService.emit('dismissAlertaRota', rg);    
  };

  
  

}
