import { SessionService } from '../../services/session.service'
import { GameService } from '../../services/game.service'
import { Game } from '../../repositories/game.repository'

export const createGameController = (
    sessionService: SessionService,
    gameService: GameService
) => {
    const getGame = async function (
        gameId: string,
        _callback: (game: Game) => void
    ) {
        try {
            const session = await sessionService.checkValidSession(
                this.handshake.auth.token
            )
            const game = await gameService.getGame(gameId, session)
            _callback(game)
        } catch (e) {
            console.error(e)
        }
    }
    return { getGame }
}
