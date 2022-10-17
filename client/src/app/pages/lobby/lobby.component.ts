import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LobbyService } from '../../services/lobby.service'
import { Subscription } from 'rxjs'
import { Mission, missions } from 'src/staticData'
import { AuthService } from '../../services/auth.service'
import { Lobby, LobbyStatus } from 'src/types'

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit, OnDestroy {
    groupId: string | undefined
    missions: Mission[] = missions
    userID: string | null | undefined
    lobby: Lobby | null = null
    onLobbyChangedSubscription: Subscription | undefined
    onGameStartedSubscription: Subscription | undefined

    constructor(
        private activatedRoute: ActivatedRoute,
        private lobbyService: LobbyService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.userID = this.authService.getUserID()
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
                this.router.navigate(['game', game._id]).then()
            })
    }

    startGame() {
        if (this.groupId != null) {
            this.lobbyService.startGame(this.groupId).subscribe((game) => {
                this.router.navigate(['game', game._id]).then()
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

    selectMission(mission: Mission) {
        if (this.groupId) {
            this.lobbyService.setMission(this.groupId, mission).subscribe()
        }
    }

    showOwnerView() {
        return (
            this.lobby &&
            this.lobby.owner.userID === this.userID &&
            this.lobby.status === LobbyStatus.Forming
        )
    }

    isInGame() {
        return (
            this.lobby &&
            this.lobby.status === LobbyStatus.InGame &&
            this.lobby.activeGame
        )
    }

    navigateToGame() {
        if (this.lobby) {
            this.router.navigate(['game', this.lobby.activeGame]).then()
        }
    }
}
