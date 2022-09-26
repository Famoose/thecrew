import { Component, OnInit } from '@angular/core'
import { MainService } from '../../services/main.service'
import { LobbyService } from '../../services/lobby.service'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(
        private mainService: MainService,
        private lobbyService: LobbyService,
        private router: Router,
        private activeRouter: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activeRouter.queryParams.subscribe((params) => {
            if (params['forceAuth']) {
                this.mainService.authenticate()
            }
        })
    }

    createLobby() {
        this.lobbyService.createLobby().subscribe((groupId) => {
            this.router.navigate(['/lobby', groupId])
        })
    }
}
