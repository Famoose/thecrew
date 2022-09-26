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

    joinChatGroup(groupId: string) {
        return new Observable((observer) => {
            this.chatSocket.emit('joinChatGroup', groupId, () => {
                observer.next()
            })
        })
    }

    sendMessage(groupId: string, message: string) {
        this.chatSocket.emit('sendMessage', groupId, message)
    }

    receiveMessage(): Observable<{ groupId: string; message: string }> {
        return this.chatSocket.fromEvent<{ groupId: string; message: string }>(
            'onMessageSent'
        )
    }
}
