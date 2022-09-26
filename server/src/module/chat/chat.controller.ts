import { SessionService } from '../../services/session.service'
import { ChatService } from '../../services/chat.service'
import { Namespace } from 'socket.io'

export const createChatController = (
    namespace: Namespace,
    sessionService: SessionService,
    chatService: ChatService
) => {
    const joinChatGroup = async function (
        groupId: string,
        _callback: () => void
    ) {
        try {
            const session = await sessionService.checkValidSession(
                this.handshake.auth.token
            )
            if (await chatService.isSessionInChatGroup(groupId, session)) {
                this.join(groupId)
                console.log('joined chatGroup ' + groupId)
                _callback()
            }
        } catch (e) {
            console.error(e)
        }
    }

    const sendMessage = async function (groupId: string, message: string) {
        try {
            const session = await sessionService.checkValidSession(
                this.handshake.auth.token
            )
            if (await chatService.isSessionInChatGroup(groupId, session)) {
                console.log(
                    'send message to: ' + groupId + ' message: ' + message
                )
                namespace
                    .to(groupId)
                    .emit('onMessageSent', { groupId, message })
            }
        } catch (e) {
            console.error(e)
        }
    }

    return { joinChatGroup, sendMessage }
}
