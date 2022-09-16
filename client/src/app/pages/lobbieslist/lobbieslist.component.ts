import { Component, OnInit } from '@angular/core';
import {LobbyService} from "../../services/lobby.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobbieslist.component.html',
  styleUrls: ['./lobbieslist.component.scss']
})
export class LobbieslistComponent implements OnInit {
  lobbies: any;

  constructor(private lobbyService: LobbyService) {
    console.log("lobbieslist initiated")
  }

  ngOnInit(): void {
    //
  }

}
