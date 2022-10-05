import {
    AfterViewChecked,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core'
import { MainService } from '../../services/main.service'
import { ChatService } from '../../services/chat.service'
import { Subscription } from 'rxjs'
import { Message } from 'src/types'

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
    @Input() groupId: string | undefined
    @ViewChild('chatBody') chatBody: ElementRef | undefined
    message = ''
    messages: Message[] = []
    collapsed: boolean = false

    receiveMessageSubscription: Subscription | undefined

    constructor(
        private mainService: MainService,
        private chatService: ChatService
    ) {}

    ngOnInit(): void {
        if (this.groupId) {
            this.chatService.joinChatGroup(this.groupId).subscribe()
            this.receiveMessageSubscription = this.chatService
                .receiveMessage()
                .subscribe((newMessage) => {
                    this.messages.push(newMessage)
                })
        }
    }

    sendMessage() {
        if (this.groupId && this.message) {
            console.log('send message: ' + this.message + ' to ' + this.groupId)
            this.chatService.sendMessage(this.groupId, this.message)
            this.message = ''
        }
    }

    toggleChatWindow() {
        this.collapsed = !this.collapsed
    }

    ngAfterViewChecked(): void {
        if (this.chatBody) {
            this.chatBody.nativeElement.scrollTo(
                0,
                this.chatBody.nativeElement.scrollHeight
            )
        }
    }

    ngOnDestroy() {
        if (this.receiveMessageSubscription) {
            this.receiveMessageSubscription.unsubscribe()
        }
    }
}
