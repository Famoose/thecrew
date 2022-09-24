import {Component, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {LobbyService} from "../../services/lobby.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private mainService: MainService,
              private lobbyService: LobbyService,
              private router: Router
  ) {
    console.log('begin authenticate')
    mainService.authenticate()
  }

  ngOnInit(): void {
    console.log("initiated")
  }

  createLobby() {
    this.lobbyService.createLobby()
    this.router.navigate(["/lobby/42"])
    //Antwort bekommen etwas next /lobby und group Id mitgeben
  }
}
