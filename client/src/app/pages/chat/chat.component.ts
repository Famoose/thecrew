import {Component, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message = ""
  messages: string[] = []

  constructor(private mainService: MainService,
              private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.receiveMessage().subscribe((newMessage: string) => {
      this.messages.push(newMessage)
    })
    //todo: call join chat by group id
  }

  sendMessage() {
    if (this.message) {
      this.chatService.sendMessage(this.message)
    }
  }

  toggleChatWindow() {
    //
  }
}
