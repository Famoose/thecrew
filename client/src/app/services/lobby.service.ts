import { Injectable } from '@angular/core'
import { LobbySocket } from '../config/socket.config'
import { Observable, throttleTime } from 'rxjs'
import { Lobby } from 'src/types'
import { Game } from '../../types'

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

    startGame(groupId: string) {
        return new Observable<Game>((observer) => {
            this.lobbySocket.emit('lobby:startGame', groupId, (game: Game) => {
                if (game) {
                    observer.next(game)
                } else {
                    observer.error('game could not be loaded')
                }
            })
        })
    }

    onGameStarted() {
        return this.lobbySocket.fromEvent<Game>('lobby:gameStarted')
    }

    onLobbyChanged() {
        return this.lobbySocket.fromEvent<Lobby>('lobby:changed')
    }

    onLobbyListChange() {
        return this.lobbySocket
            .fromEvent('lobby:list:changed')
            .pipe(throttleTime(1000))
    }
}
