import { APP_INITIALIZER, NgModule } from '@angular/core'
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
import { PlayersComponent } from './components/players/players.component'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { LangSelectorComponent } from './components/lang-selector/lang-selector.component'
import {
    initLanguageService,
    LanguageService,
} from './services/language.service'
import { DataLangDirective } from './directives/data-lang.directive'

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http)
}

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
        PlayersComponent,
        PlayersComponent,
        LangSelectorComponent,
        LangSelectorComponent,
        DataLangDirective,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SocketIoModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [
        MainSocket,
        LobbySocket,
        ChatSocket,
        GameSocket,
        {
            provide: APP_INITIALIZER,
            useFactory: initLanguageService,
            deps: [LanguageService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
