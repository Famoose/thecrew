import { Component, OnInit } from '@angular/core'
import { MainService } from './services/main.service'
import { LobbyService } from './services/lobby.service'
import { ChatService } from './services/chat.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    message = ''

    constructor(
        private mainService: MainService,
        private chatService: ChatService,
        private lobbyService: LobbyService
    ) {
        console.log('begin authenticate')
        mainService.authenticate()
    }

    ngOnInit(): void {
        this.chatService.receiveMessage().subscribe((newMessage: string) => {
            console.log(newMessage)
        })
    }

    createLobby() {
        this.lobbyService.createLobby()
    }

    sendMessage() {
        if (this.message) {
            this.chatService.sendMessage(this.message)
        }
    }
}
