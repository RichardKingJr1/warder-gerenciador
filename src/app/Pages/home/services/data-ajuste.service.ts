import { NumberFormatStyle } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataAjusteService {

  constructor() { }


  //ajusta o formato da hora
  ajustarHora(dia:Date){
    let h = dia.getHours();
    let m = dia.getMinutes();

    // add a zero in front of numbers<10
    let h_string = this.checkTime(h);
    let m_string = this.checkTime(m);

    return h_string+':'+m_string+':00';
  }

  //função derivada de ajsutar hora, roda em processamento interno
  checkTime(i:number) {
    let i_string: string = i.toString();
    if (i < 10) {
      i_string = "0" + i.toString();
    }
    return i_string;
  }
}
