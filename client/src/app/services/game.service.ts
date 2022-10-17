import { Injectable } from '@angular/core'
import { GameSocket } from '../config/socket.config'
import { Observable } from 'rxjs'
import { Game } from '../../types'
import { Card } from 'src/staticData'

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

    onPlayedCard() {
        return this.gameSocket.fromEvent<Game>('game:onPlayedCard')
    }

    onNewRound() {
        return this.gameSocket.fromEvent<Game>('game:onNewRound')
    }

    onGameEnd() {
        return this.gameSocket.fromEvent<Game>('game:onGameEnd')
    }

    playCard(gameId: string, card: Card) {
        return new Observable<Game>((observer) => {
            this.gameSocket.emit(
                'game:playCard',
                gameId,
                card,
                (success: boolean) => {
                    if (success) {
                        observer.next()
                    } else {
                        observer.error('player is not allowed to play')
                    }
                }
            )
        })
    }
}
