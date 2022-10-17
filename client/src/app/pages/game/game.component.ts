import { Component, OnInit } from '@angular/core'
import { Game } from '../../../types'
import { GameService } from '../../services/game.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Card } from 'src/staticData'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
    game: Game | undefined
    gameId: string | undefined
    playerCards: Card[] = []
    playedCards: Card[] = []
    constructor(
        private gameService: GameService,
        private autService: AuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.gameService.onNewRound().subscribe((game) => {
            this.game = game
            this.setPlayerCards()
            this.setPlayedCards()
        })
        this.gameService.onPlayedCard().subscribe((game) => {
            this.game = game
            this.setPlayerCards()
            this.setPlayedCards()
        })
        this.activatedRoute.params.subscribe((params) => {
            this.gameId = params['gameId']
            if (this.gameId) {
                this.gameService.getGame(this.gameId).subscribe(
                    (game) => {
                        this.game = game
                        this.setPlayerCards()
                        this.setPlayedCards()
                    },
                    () => {
                        console.log('game not found')
                        this.router.navigate(['/'])
                    }
                )
            }
        })
    }

    playCard($event: Card) {
        if (this.gameId) {
            this.gameService.playCard(this.gameId, $event).subscribe()
        }
    }

    setPlayerCards() {
        if (this.game) {
            this.playerCards =
                this.game.rounds[this.game.rounds.length - 1].cardsPlayers.find(
                    (cp) => cp.player.userID === this.autService.getUserID()
                )?.cards || []
        }
    }

    setPlayedCards() {
        if (this.game) {
            this.playedCards = this.game.rounds[
                this.game.rounds.length - 1
            ].moves.map((m) => m.card)
        }
    }
}
