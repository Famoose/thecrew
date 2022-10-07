import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import {
    ChatSocket,
    GameSocket,
    LobbySocket,
    MainSocket,
} from './config/socket.config'
import { SocketIoModule } from 'ngx-socket-io'
import { FormsModule } from '@angular/forms'
import { HomeComponent } from './pages/home/home.component'
import { LobbiesListComponent } from './pages/lobbieslist/lobbies-list.component'
import { LobbyComponent } from './pages/lobby/lobby.component'
import { ChatComponent } from './components/chat/chat.component'
import { GameComponent } from './pages/game/game.component'
import { CardComponent } from './components/card/card.component'
import { CardsComponent } from './components/cards/cards.component'
import { PlayerComponent } from './components/player/player.component'
import { QuestsComponent } from './components/quests/quests.component'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LobbiesListComponent,
        LobbyComponent,
        ChatComponent,
        GameComponent,
        CardComponent,
        CardsComponent,
        PlayerComponent,
        QuestsComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, SocketIoModule, FormsModule],
    providers: [MainSocket, LobbySocket, ChatSocket, GameSocket],
    bootstrap: [AppComponent],
})
export class AppModule {}
