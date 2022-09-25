import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LobbieslistComponent} from "./pages/lobbieslist/lobbieslist.component";
import {HomeComponent} from "./pages/home/home.component";
import {LobbyComponent} from "./pages/lobby/lobby.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'lobbieslist', component: LobbieslistComponent},
  { path: 'lobby/:groupId', component: LobbyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
