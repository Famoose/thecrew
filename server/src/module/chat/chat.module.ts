import { createMiddleware } from '../../middleware'
import { Services } from '../../services/services'
import { ServerSpecifyType } from '../../socket'
import { createChatController } from './chat.controller'

export const createChatModule = (io: ServerSpecifyType, services: Services) => {
    const { sessionService, chatService } = services

    const namespace = io.of('chat')

    namespace.use(createMiddleware(sessionService).checkSession)

    const { joinChatGroup, sendMessage } = createChatController(
        namespace,
        sessionService,
        chatService
    )

    namespace.on('connection', (socket) => {
        socket.on('joinChatGroup', joinChatGroup)
        socket.on('sendMessage', sendMessage)
    })
}
