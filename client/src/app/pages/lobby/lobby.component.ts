import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LobbyService} from "../../services/lobby.service";
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
 groupID = ""

  constructor(
    private activatedRoute: ActivatedRoute,
    private lobbyService: LobbyService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.groupID = params['groupID'];
    })
    this.lobbyService.followInvitationLink(this.groupID)
    this.chatService.joinChatGroup() //groupID auch mitgeben?
    //this.lobbyService join lobby (bei Lobby)
    // this.chat --> id übergeben
  }

}
