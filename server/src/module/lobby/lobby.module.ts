import { Services } from '../../services/services'
import { createLobbyController } from './lobby.controller'
import { ServerSpecifyType } from '../../socket'

export const createLobbyModule = (
    io: ServerSpecifyType,
    services: Services
) => {
    const { sessionService, groupService, lobbyService } = services

    const { createLobby, joinLobby, listLobbies } = createLobbyController(
        sessionService,
        groupService,
        lobbyService
    )

    const namespace = io.of('lobby')

    namespace.on('connection', (socket) => {
        socket.on('lobby:create', createLobby)
        socket.on('lobby:join', joinLobby)
        socket.on('lobby:all', listLobbies)
    })
}
