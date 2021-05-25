import { Component, OnInit } from '@angular/core';
import { DataAjusteService } from '../../services/data-ajuste.service';

import { WebSocketService } from '../../services/web-socket.service';
import { BuscarImovelService } from './services/buscar-imovel.service';


@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.css']
})
export class SolicitacoesComponent implements OnInit {

  public solicitacoes: any; /////////////////adicionar tipagem
  public rg: string | null = null;
  public endereco: string | null = null;

  constructor(
    private webSocketService:WebSocketService,
    private _buscarImovel:BuscarImovelService,
    private _dataAjusteService: DataAjusteService
    ) { }

  ngOnInit(): void {
    this.buscarSolicitacao();
  }

  buscarSolicitacao(){
    this.webSocketService.listen('newRequest').subscribe((data) => {
      this.solicitacoes = data;
      console.log(data);
      console.log(this.rg);
    });
  }  

  excluirSolicitacao(id:number, rg:string){
    console.log(id);
    this.webSocketService.emit('deniedServer', id);    
    
    if(this.rg == rg){
      this.rg = null;
    };
  }

  selecionarRg(rg: string){
    this.rg = rg;
    console.log('Selecionou');
  }

  adicionarTracking(){
    let destino = this.endereco;
    if(destino){
      console.log(this.rg);
      if(this.rg){
        let today = new Date();
  
        //busca pelo google
        /* this.geoService.getLocation(destino)
        .subscribe(data=>{
          //busca geoloc do destino
          let lat_d = data.results[0].geometry.location.lat;
          let lon_d = data.results[0].geometry.location.lng;

          
          console.log(data);
          this.geoService2.getLocation(this.lat_i, this.lon_i, lat_d, lon_d)
          .subscribe(data=>{

            //função busca tempo de chegada
            let tempo_chegada = data.rows[0].elements[0].duration.value;
            tempo_chegada = Math.round((tempo_chegada/60)+0.5);
            
            let chegada = new Date(today.getTime() + (tempo_chegada*60000));

            //ajusta horario
            let time_chegada = this.ajustarHora(chegada);
      
            let dataObj = {
              rg: this.rg,
              destino: destino,
              lat_d:lat_d,
              lon_d:lon_d,
              duracao_viajem:tempo_chegada,
              tempo_chegada:time_chegada
            }
      
            this.webSocketService.emit('joinServer', dataObj);
            this.rg = null;
            this.endereco = null;

          });          
        }); */

        //busca interna
        let dados = this._buscarImovel.buscarEndereco(destino.toLowerCase());

        if(dados != null){
          let lat_d = dados.lat;
          let lon_d = dados.lon;

          //função busca tempo de chegada
          let tempo_chegada = dados.tempo;
          //tempo_chegada = Math.round((tempo_chegada/60)+0.5);

          let chegada = new Date(today.getTime() + (tempo_chegada*60000) + 60000);

          //ajusta horario
          let time_chegada = this._dataAjusteService.ajustarHora(chegada);
    
          let dataObj = {
            id_imovel: dados.id_imovel,
            rg: this.rg,
            destino: destino,
            lat_d:lat_d,
            lon_d:lon_d,
            duracao_viajem:tempo_chegada,
            tempo_chegada:time_chegada
          }
    
          this.webSocketService.emit('joinServer', dataObj);
          this.rg = null;
          this.endereco = null;
        }else{
          window.alert('Endereço invalido');
        } 

      }else{
        window.alert('Selecione o RG');
      }
    }else{
      window.alert('Adiciono o endereço');
    }
    
  }

}
