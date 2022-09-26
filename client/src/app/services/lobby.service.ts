import { Injectable } from '@angular/core'
import { LobbySocket } from '../config/socket.config'
import { Observable } from 'rxjs'
import { Lobby } from 'src/types'

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
        return new Observable((observer) => {
            this.lobbySocket.emit('lobby:create', (groupId: string) => {
                if (groupId) {
                    observer.next(groupId)
                } else {
                    observer.error('Failed to create lobby')
                }
            })
        })
    }

    joinLobby(groupId: string) {
        return new Observable<Lobby>((observer) => {
            this.lobbySocket.emit(
                'lobby:join',
                groupId,
                (lobby: Lobby | null) => {
                    console.log('joined lobby: ' + lobby)
                    if (lobby) {
                        observer.next(lobby)
                    } else {
                        observer.error('failed to join lobby')
                    }
                }
            )
        })
    }

    getAllLobbies() {
        return new Observable<Lobby[]>((observer) => {
            this.lobbySocket.emit('lobby:all', (lobbies: Lobby[]) => {
                observer.next(lobbies)
            })
        })
    }
}
