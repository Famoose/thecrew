import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Lobby } from '../../../types'
import { LobbyService } from '../../services/lobby.service'

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
    groupId: string | undefined

    constructor(
        private activatedRoute: ActivatedRoute,
        private lobbyService: LobbyService,
        private router: Router
    ) {}

    lobby: Lobby | null = null

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.groupId = params['groupId']
            if (this.groupId) {
                this.lobbyService.joinLobby(this.groupId).subscribe(
                    (lobby) => {
                        this.lobby = lobby
                    },
                    () => {
                        console.log('group not found')
                        this.router.navigate(['/'])
                    }
                )
            }
        })
    }
}
