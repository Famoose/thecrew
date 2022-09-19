import { SessionService } from '../../services/session.service'
import { ChatService } from '../../services/chat.service'
import { Namespace } from 'socket.io'

export const createChatController = (
    namespace: Namespace,
    sessionService: SessionService,
    chatService: ChatService
) => {
    const joinChatGroup = async function () {
        try {
            const session = await sessionService.checkValidSession(
                this.handshake.auth.token
            )
            const groupID = await chatService.tryGetChatGroupID(session)
            this.join(groupID)
        } catch (e) {
            console.error(e)
        }
    }

    const sendMessage = async function (message: string) {
        try {
            const session = await sessionService.checkValidSession(
                this.handshake.auth.token
            )
            const groupID = await chatService.tryGetChatGroupID(session)
            namespace.in(groupID).emit('onMessageSent', message)
        } catch (e) {
            console.error(e)
        }
    }

    return { joinChatGroup, sendMessage }
}
