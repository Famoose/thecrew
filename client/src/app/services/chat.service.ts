import { Injectable } from '@angular/core'
import { ChatSocket } from '../config/socket.config'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    constructor(private chatSocket: ChatSocket) {
        chatSocket.on('connect_error', (err: { message: any }) => {
            console.log(err.message) // prints the message associated with the error
        })
        chatSocket.on('error', (err: { message: any }) => {
            console.log(err.message) // prints the message associated with the error
        })
    }

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
