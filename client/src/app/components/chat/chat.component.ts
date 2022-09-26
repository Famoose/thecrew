import { Component, Input, OnInit } from '@angular/core'
import { MainService } from '../../services/main.service'
import { ChatService } from '../../services/chat.service'

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
    @Input() groupId: string | undefined
    message = ''
    messages: string[] = []

    constructor(
        private mainService: MainService,
        private chatService: ChatService
    ) {}

    ngOnInit(): void {
        if (this.groupId) {
            this.chatService.joinChatGroup(this.groupId).subscribe()
            this.chatService.receiveMessage().subscribe((newMessage) => {
                this.messages.push(newMessage.message)
            })
        }
    }

    sendMessage() {
        if (this.groupId && this.message) {
            console.log('send message: ' + this.message + ' to ' + this.groupId)
            this.chatService.sendMessage(this.groupId, this.message)
        }
    }

    toggleChatWindow() {
        //
    }
}
