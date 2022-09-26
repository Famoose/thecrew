import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LobbieslistComponent } from './pages/lobbieslist/lobbieslist.component'
import { HomeComponent } from './pages/home/home.component'
import { LobbyComponent } from './pages/lobby/lobby.component'
import { IsAuthenticatedGuard } from './guard/is-authenticated.guard'

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'lobbieslist',
        component: LobbieslistComponent,
        canActivate: [IsAuthenticatedGuard],
    },
    {
        path: 'lobby/:groupId',
        component: LobbyComponent,
        canActivate: [IsAuthenticatedGuard],
    },
    { path: '**', component: HomeComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
