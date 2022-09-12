import { Injectable } from '@angular/core'
import { LobbySocket } from '../config/socket.config'

@Injectable({
    providedIn: 'root',
})
export class LobbyService {
    constructor(private lobbySocket: LobbySocket) {
        lobbySocket.on('connect_error', (err: { message: any }) => {
            console.log(err.message) // prints the message associated with the error
        })
        lobbySocket.on('error', (err: { message: any }) => {
            console.log(err.message) // prints the message associated with the error
        })
    }

    createLobby() {
        this.lobbySocket.emit('lobby:create')
    }

    followInvitationLink(link: string) {
        this.lobbySocket.emit('followInvitationLink', link, () => {
            //
        })
    }
}
