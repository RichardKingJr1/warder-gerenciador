import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonitoradorService {

  //config distancia
  public distancia_config = 0.00050;

  constructor() { }

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
}
