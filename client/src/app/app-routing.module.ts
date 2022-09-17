import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LobbieslistComponent} from "./pages/lobbieslist/lobbieslist.component";

const routes: Routes = [
  { path: './pages/lobbieslist', component: LobbieslistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
