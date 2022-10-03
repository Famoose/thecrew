import { Injectable } from '@angular/core'
import { GameSocket } from '../config/socket.config'
import { Observable } from 'rxjs'
import { Game } from '../../types'

@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor(private gameSocket: GameSocket) {
        gameSocket.on('connect_error', (err: { message: any }) => {
            console.log(err.message) // prints the message associated with the error
        })
        gameSocket.on('error', (err: { message: any }) => {
            console.log(err.message) // prints the message associated with the error
        })
    }

    getGame(gameId: string) {
        return new Observable<Game>((observer) => {
            this.gameSocket.emit('game:get', gameId, (game: Game) => {
                if (game) {
                    observer.next(game)
                } else {
                    observer.error('game could not be loaded')
                }
            })
        })
    }
}
