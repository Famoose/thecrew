import { Injectable } from '@angular/core';
import {MainSocket} from "../config/socket.config";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private mainSocket: MainSocket, private authService: AuthService) {
  }

  authenticate(){
    console.log('authenticate')
    this.mainSocket.emit('session:get', ({ sessionID }: {sessionID: string}) => {
      console.log(sessionID)
      this.authService.setSessionID(sessionID);
    });
  }

}
