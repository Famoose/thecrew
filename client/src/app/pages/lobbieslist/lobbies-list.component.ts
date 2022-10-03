import { Component, OnDestroy, OnInit } from '@angular/core'
import { Lobby } from '../../../types'
import { LobbyService } from '../../services/lobby.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-lobby',
    templateUrl: './lobbies-list.component.html',
    styleUrls: ['./lobbies-list.component.scss'],
})
export class LobbiesListComponent implements OnInit, OnDestroy {
    lobbies: Lobby[] | undefined
    lobbyListChangeSubscription: Subscription | undefined

    constructor(private lobbyService: LobbyService) {}

    ngOnInit(): void {
        this.loadLobbies()
        this.lobbyListChangeSubscription = this.lobbyService
            .onLobbyListChange()
            .subscribe(() => this.loadLobbies())
    }

    loadLobbies() {
        this.lobbyService
            .getAllLobbies()
            .subscribe((lobbies) => (this.lobbies = lobbies))
    }

    ngOnDestroy(): void {
        if (this.lobbyListChangeSubscription) {
            this.lobbyListChangeSubscription.unsubscribe()
        }
    }
}
