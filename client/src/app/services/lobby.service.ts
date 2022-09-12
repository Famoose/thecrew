import { Injectable } from '@angular/core'
import { LobbySocket } from '../config/socket.config'

@Injectable({
    providedIn: 'root',
})
export class LobbyService {
    constructor(private lobbySocket: LobbySocket) {}

    createLobby() {
        this.lobbySocket.emit('lobby:create')
    }

    followInvitationLink(link: string) {
        this.lobbySocket.emit('followInvitationLink', link, () => {
            //
        })
    }
}
