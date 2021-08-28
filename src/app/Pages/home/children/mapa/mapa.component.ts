import { Component, OnInit } from '@angular/core';
import { usuarioType } from 'src/app/interfaces/usuario';
import { MonitoradorService } from '../../services/monitorador.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  public usuarios: usuarioType[] = [];

  //poscição central do mapa
  lat = -22.911358;
  lng = -47.003339;

  constructor(private _monitorador: MonitoradorService) { }

  ngOnInit(): void {
    this.monitorarUsuarios();
  }

  monitorarUsuarios(){
    this._monitorador.busca().subscribe((data) =>{
      this.usuarios = data;
    })
  }

}
