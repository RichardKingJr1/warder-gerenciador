import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { estacionandoType, usuarioType } from 'src/app/interfaces/usuario';
import { DataAjusteService } from './data-ajuste.service';
import { WebSocketService } from './web-socket.service';



@Injectable({
  providedIn: 'root'
})
export class MonitoradorService {

  //variaveis de usuarios
  public usuarios_pre: usuarioType[] = [];
  public usuarios: usuarioType[] | null = null;
  public ultimosUsuarios: usuarioType[] | null = null;
  public estacionando: estacionandoType[] = [];

  public currentUsuarios: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  //config variaveis inicias
  public distancia_config = 0.00050;
  public tempo_permanencia = 5;
  public delay_aviso = 1;
  public dismiss_aviso = 20;

  constructor(private webSocketService:WebSocketService, private _dataAjusteService: DataAjusteService) { }


  //busca usuarios e status atual dos usuarios
    busca(): Observable<usuarioType[]>  {
    this.webSocketService.listen('newUser').subscribe((data:any) => {
      console.log(data);
      this.ultimosUsuarios = this.usuarios;
      this.usuarios_pre = data;
      this.usuarios = data;


      if(this.ultimosUsuarios){
        //descobre a fase da viagem
        for (const x of this.usuarios_pre){ 
          switch(x.status){
            case 1: //indo até a case
              //verifica mudança de fase
              if(this.verificarDistancia(x.lat, x.lat_d, x.lon, x.lon_d,1)){
                //procura se a chegada ja foi marcada
                let foundIndex = this.estacionando.findIndex(z => z.rg == x.rg);
                if(foundIndex != -1){
                  //se a chegada ja foi marcada verifica se ja está na localização a 30s
                  if(Date.now() - this.estacionando[foundIndex].timestamp > 30000){
                    //atualiza faze de posicionamento
                    console.log(x);
                    console.log(x.duracao_viajem);
                    this.estacionando.filter(u => u.rg !== x.rg);
                    this.atualizaPosicao(x.rg, 2, x.duracao_viajem);
                  }
                }else{
                  //se não foi marcada adicionar chegada no array
                  let tempoObj = {
                    rg: x.rg,
                    timestamp: Date.now()
                  };
                  this.estacionando.push(tempoObj);
                }
              };  
              //verifica se a fase esta dentro do tempo
              this.verificaTempo(x.tempo_chegada, x.rg, x.status);
              break;
  
            case 2://entregando na casa
              //verifica mudança de fase
              if(this.verificarDistancia(x.lat, x.lat_d, x.lon, x.lon_d,2)){
                //atualiza faze de posicionamento
                this.atualizaPosicao(x.rg, 3, x.duracao_viajem);
              };
              //verifica se a fase esta dentro do tempo
              this.verificaTempo(x.tempo_permanencia, x.rg, x.status);
              break;
  
            case 3: //saindo do condo
              this.verificaTempo(x.tempo_saida, x.rg, x.status);
              break;
  
            //default:
          };   
        };
      }

      this.currentUsuarios.next(this.usuarios);
    })
    
    return this.currentUsuarios;
  }

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

  verificaTempo(tempo_saida:string, rg:string, status: number){
    console.log('verificação realizada');
    if(this.testaTempo(tempo_saida)){
      this.webSocketService.emit('ultrapassouTempo', rg);

      let today = new Date();
      let dataObj = {
        rg: rg,
        status: status ,
        tempo: this._dataAjusteService.ajustarHora(new Date(today.getTime() + this.delay_aviso*60000))
      }
      this.webSocketService.emit('alertaAtualizado', dataObj);
    };
  }

   //parte da função anterior que faz a comparação do tempo
   testaTempo(tempo_destino: string){
    let today = new Date();
    let tempo_atual = new Date(today.getTime());

    let tempo_atual_final = tempo_atual.getHours()*60+tempo_atual.getMinutes();

    let tempo_destino_final;

    if(tempo_atual.getHours() == 23 && parseInt(tempo_destino.slice(0,1)) == 0){
      tempo_destino_final = 12*60+parseInt(tempo_destino.slice(3,5));
    }else{
      tempo_destino_final = (parseInt(tempo_destino.slice(0,2)))*60+parseInt(tempo_destino.slice(3,5));
    };

    console.log('atual:'+tempo_atual_final);
    console.log('destino: '+tempo_destino_final);
    
    if(tempo_atual_final < tempo_destino_final){
      return false;
    }else{
      return true;
    };
  };


}
