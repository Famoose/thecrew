import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Lobby } from '../../../types'
import { LobbyService } from '../../services/lobby.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit, OnDestroy {
    groupId: string | undefined

    constructor(
        private activatedRoute: ActivatedRoute,
        private lobbyService: LobbyService,
        private router: Router
    ) {}

    lobby: Lobby | null = null
    onLobbyChangedSubscription: Subscription | undefined
    onGameStartedSubscription: Subscription | undefined

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
        this.onLobbyChangedSubscription = this.lobbyService
            .onLobbyChanged()
            .subscribe((lobby) => (this.lobby = lobby))
        this.onGameStartedSubscription = this.lobbyService
            .onGameStarted()
            .subscribe((game) => {
                this.router.navigate(['game', game._id])
            })
    }

    startGame() {
        if (this.groupId != null) {
            this.lobbyService.startGame(this.groupId).subscribe((game) => {
                this.router.navigate(['game', game._id])
            })
        }
    }

    ngOnDestroy(): void {
        if (this.onLobbyChangedSubscription) {
            this.onLobbyChangedSubscription.unsubscribe()
        }
        if (this.onGameStartedSubscription) {
            this.onGameStartedSubscription.unsubscribe()
        }
    }
}
