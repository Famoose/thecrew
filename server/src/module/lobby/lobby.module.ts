import { Services } from '../../services/services'
import { createLobbyController } from './lobby.controller'
import { ServerSpecifyType } from '../../socket'

export const createLobbyModule = (
    io: ServerSpecifyType,
    services: Services
) => {
    const { sessionService, groupService, lobbyService, gameService } = services

    const namespace = io.of('lobby')

    const { createLobby, joinLobby, listLobbies, startGame, setMission } =
        createLobbyController(
            namespace,
            sessionService,
            groupService,
            lobbyService,
            gameService
        )

    namespace.on('connection', (socket) => {
        socket.on('lobby:create', createLobby)
        socket.on('lobby:join', joinLobby)
        socket.on('lobby:all', listLobbies)
        socket.on('lobby:startGame', startGame)
        socket.on('lobby:setMission', setMission)
    })
}
