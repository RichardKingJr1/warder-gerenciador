import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: Socket;

  constructor() {
    this.socket = io();
    //this.socket = io('http://localhost:3000');
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) =>{
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any){
    this.socket.emit(eventName,data);
  }
}
