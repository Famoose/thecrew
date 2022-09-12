import { SessionService } from '../../services/session.service'
import { ChatService } from '../../services/chat.service'
import { Namespace } from 'socket.io'

export const createChatController = (
    namespace: Namespace,
    sessionService: SessionService,
    chatService: ChatService
) => {
    const joinChatGroup = function () {
        const session = sessionService.checkValidSession(this.data.sessionID)
        const groupID = chatService.tryGetChatGroupID(session)
        this.join(groupID)
    }

    const sendMessage = function (message: string) {
        const session = sessionService.checkValidSession(this.data.sessionID)
        const groupID = chatService.tryGetChatGroupID(session)
        namespace.in(groupID).emit('onMessageSent', message)
    }

    return { joinChatGroup, sendMessage }
}
