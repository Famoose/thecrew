import { Component, OnInit } from '@angular/core';
import {LobbyService} from "../../services/lobby.service";

// TODO: zum Ausprobieren, muss später ersetzt werden
const lobbies = [
  {
    groupID:"e6b15a50-698d-4541-960d-a2df8b083d6d",
    player: "3/5",
    mission: "Kampf im Röstigrabe",
    state: "Lobby"
  },
  {
    groupID: "2cc9b034-258e-4813-8527-25dca19d631a",
    player: "4/5",
    mission: "Hitzig isch nid witzig",
    state: "Lobby"
  },
  {
    groupID: "036c7a80-4d74-4a6d-bff5-79877ccfaabc",
    player: "4/5",
    mission: "Wiuheum Teu",
    state: "Game"
  }
]
@Component({
  selector: 'app-lobby',
  templateUrl: './lobbieslist.component.html',
  styleUrls: ['./lobbieslist.component.scss']
})
export class LobbieslistComponent implements OnInit {
  lobbies: any;

  constructor(private lobbyService: LobbyService) {
  }

  ngOnInit(): void {
    this.lobbyService.getAllLobbies().subscribe(lobbies => this.lobbies = lobbies)
  }

}
