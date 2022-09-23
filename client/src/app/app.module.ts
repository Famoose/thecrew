import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ChatSocket, LobbySocket, MainSocket } from './config/socket.config'
import { SocketIoModule } from 'ngx-socket-io'
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { LobbieslistComponent } from './pages/lobbieslist/lobbieslist.component';
import { LobbyComponent } from './pages/lobby/lobby.component'

@NgModule({
    declarations: [AppComponent, HomeComponent, LobbieslistComponent, LobbyComponent],
    imports: [BrowserModule, AppRoutingModule, SocketIoModule, FormsModule],
    providers: [MainSocket, LobbySocket, ChatSocket],
    bootstrap: [AppComponent],
})
export class AppModule {}
