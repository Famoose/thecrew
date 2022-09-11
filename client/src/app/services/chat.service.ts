import { Injectable } from '@angular/core';
import {ChatSocket} from "../config/socket.config";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private ChatSocket: ChatSocket) {}



}
