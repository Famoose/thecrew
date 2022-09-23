import {Component, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {LobbyService} from "../../services/lobby.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private mainService: MainService,
              private lobbyService: LobbyService
  ) {
    console.log('begin authenticate')
    mainService.authenticate()
  }

  ngOnInit(): void {
    console.log("initiated")
  }

  createLobby() {
    this.lobbyService.createLobby()
    //Antwort bekommen this.router (Konstruktor), etwas next /lobby und group Id mitgeben
  }
}
