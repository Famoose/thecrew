import { Component, OnInit } from '@angular/core'
import { MainService } from './services/main.service'
import { LobbyService } from './services/lobby.service'
import { ChatService } from './services/chat.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private mainService: MainService) {
        console.log('begin authenticate')
        mainService.authenticate().subscribe()
    }
}
