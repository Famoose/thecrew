import { Component, OnInit } from '@angular/core'
import { Game } from '../../../types'
import { GameService } from '../../services/game.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
    game: Game | undefined
    gameId: string | undefined

    constructor(
        private gameService: GameService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.gameId = params['gameId']
            if (this.gameId) {
                this.gameService.getGame(this.gameId).subscribe(
                    (game) => {
                        this.game = game
                    },
                    () => {
                        console.log('game not found')
                        this.router.navigate(['/'])
                    }
                )
            }
        })
    }
}
