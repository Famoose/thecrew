import { Injectable } from '@angular/core'
import { ChatSocket } from '../config/socket.config'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    constructor(private chatSocket: ChatSocket) {}

    joinChatGroup() {
        this.chatSocket.emit('joinChatGroup')
    }

    sendMessage(message: string) {
        this.chatSocket.emit('sendMessage', message)
    }

    receiveMessage(): Observable<string> {
        return this.chatSocket.fromEvent('onMessageSent')
    }
}
