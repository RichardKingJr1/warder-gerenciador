import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscarImovelService {

  constructor() { }

   //região de entrada do condo
   public lat_i = -22.904407;
   public lon_i = -47.001585;
 
   public imoveis = [
     {
         "id_imovel": 2,
         "endereco": "alameda das bauinias 200",
         "lat": -22.9143303497,
         "lon": -47.0038909367,
         "tempo": 5,
         "rota": null
     },
     {
         "id_imovel": 3,
         "endereco": "alameda das bauinias 250",
         "lat": -22.9132885975,
         "lon": -47.0037724475,
         "tempo": 4,
         "rota": null
     },
     {
         "id_imovel": 4,
         "endereco": "alameda das bauinias 260",
         "lat": -22.9120295378,
         "lon": -47.0040287107,
         "tempo": 4,
         "rota": null
     }
   ];
   buscarEndereco(endereco:string){
     let foundIndex = this.imoveis.findIndex(x => x.endereco == endereco);
     if(foundIndex != -1){
       return this.imoveis[foundIndex];
     }else{
       return null;
     }
     
   };
 
   buscarRota(id_imovel:number){
     let foundIndex = this.imoveis.findIndex(x => x.id_imovel == id_imovel);
     return this.imoveis[foundIndex].rota;
   }
}
