import { Injectable } from '@angular/core';
import { DataAjusteService } from './data-ajuste.service';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class MonitoradorService {

  //config 
  public distancia_config = 0.00050;
  public tempo_permanencia = 5;

  constructor(private webSocketService:WebSocketService, private _dataAjusteService: DataAjusteService) { }

  //verificar distancia
  verificarDistancia(lat:number, lat_d: number, lon:number, lon_d:number, status:number){
    if(((lat - lat_d)*(lat - lat_d)+(lon - lon_d)*(lon - lon_d)) < (this.distancia_config*this.distancia_config)){
      if(status == 1){
        return true;
      }else{
        return false;
      }
    }else{
      if(status == 1){
        return false;
      }else{
        return true;
      }
    }
  }

  //envia para o servido uma atualização da fase em que o usuario esta e também indica o proximo tempo previsto correto
  atualizaPosicao(rg:string, fase:number, tempo_viajem: number){
    let today = new Date();
    //calcula tempo medio de chegada
    let tempo_futuro;
    if(fase == 2){
      tempo_futuro = this.tempo_permanencia;
    }else{
      //função busca tempo
      tempo_futuro = tempo_viajem;
    };
    
    console.log(tempo_futuro);

    let tempo = new Date(today.getTime() + (tempo_futuro*60000));
    //ajusta horario
    let proximo_tempo = this._dataAjusteService.ajustarHora(tempo);

    let dataObj = {
      rg: rg,
      status:fase,
      tempo:proximo_tempo
    };
    this.webSocketService.emit('atualizarStatus', dataObj);
  };


}
