import { Services } from '../../services/services'
import { createGameController } from './game.controller'
import { ServerSpecifyType } from '../../socket'

export const createGameModule = (io: ServerSpecifyType, services: Services) => {
    const { sessionService, gameService } = services

    const namespace = io.of('game')

    const { getGame, playCard } = createGameController(
        namespace,
        sessionService,
        gameService
    )

    namespace.on('connection', (socket) => {
        socket.on('game:get', getGame)
        socket.on('game:playCard', playCard)
    })
}
