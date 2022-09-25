import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LobbyService} from "../../services/lobby.service";
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  groupId = ""

  constructor(
    private activatedRoute: ActivatedRoute,
    private lobbyService: LobbyService,
    private router: Router
  ) {
  }

  lobby: any = null

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.groupId = params['groupId'];
      this.lobbyService.joinLobby(this.groupId).subscribe((lobby) => {
        this.lobby = lobby;
      }, () => {
        console.log('group not found')
        this.router.navigate(['/'])
      })
    })
  }

}
