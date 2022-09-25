import {Component, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {LobbyService} from "../../services/lobby.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private mainService: MainService,
              private lobbyService: LobbyService,
              private router: Router
  ) {
  }

  createLobby() {
    this.lobbyService.createLobby().subscribe((groupId) => {
      this.router.navigate(['lobby', groupId])
    });
  }
}
