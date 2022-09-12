import { Services } from '../../services/services'
import { createMiddleware } from '../../middleware'
import { createLobbyController } from './lobby.controller'
import { ServerSpecifyType } from '../../socket'

export const createLobbyModule = (
    io: ServerSpecifyType,
    services: Services
) => {
    const { sessionService, groupService } = services

    const { createLobby, followInvitationLink } = createLobbyController(
        sessionService,
        groupService
    )

    const namespace = io.of('lobby')

    namespace.use(createMiddleware(sessionService).checkSession)

    namespace.on('connection', (socket) => {
        socket.on('lobby:create', createLobby)
        socket.on('followInvitationLink', followInvitationLink)
    })
}
