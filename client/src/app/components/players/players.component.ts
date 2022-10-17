import { Component, Input, OnInit } from '@angular/core'
import { Game, Session } from 'src/types'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
    @Input() game: Game | undefined
    players: Session[] | undefined
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        if (this.game) {
            this.players = this.game.lobby.group.groupMembers.filter(
                (member) => member.userID !== this.authService.getUserID()
            )
        }
    }

    isPlayersTurn(player: Session) {
        if (this.game) {
            const currentRound = this.game.rounds[this.game.rounds.length - 1]
            return currentRound.nextPlayer.userID === player.userID
        }
        return false
    }
}
