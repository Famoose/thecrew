import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LobbiesListComponent } from './pages/lobbieslist/lobbies-list.component'
import { HomeComponent } from './pages/home/home.component'
import { LobbyComponent } from './pages/lobby/lobby.component'
import { IsAuthenticatedGuard } from './guard/is-authenticated.guard'
import { GameComponent } from './pages/game/game.component'

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'lobbieslist',
        component: LobbiesListComponent,
        canActivate: [IsAuthenticatedGuard],
    },
    {
        path: 'lobby/:groupId',
        component: LobbyComponent,
        canActivate: [IsAuthenticatedGuard],
    },
    {
        path: 'game/:gameId',
        component: GameComponent,
        canActivate: [IsAuthenticatedGuard],
    },
    { path: '**', component: HomeComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
