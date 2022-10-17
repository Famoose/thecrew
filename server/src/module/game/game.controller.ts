import { SessionService } from '../../services/session.service'
import { GameService } from '../../services/game.service'
import { Game } from '../../repositories/game.repository'
import { Card } from '../../data/cards'
import { Namespace } from 'socket.io'

export const createGameController = (
    namespace: Namespace,
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
            this.join(gameId)
            _callback(game)
        } catch (e) {
            console.error(e)
        }
    }

    const playCard = async function (
        gameId: string,
        card: Card,
        _callback: (success: boolean) => void
    ) {
        try {
            const session = await sessionService.checkValidSession(
                this.handshake.auth.token
            )
            const game = await gameService.getGame(gameId, session)
            const currentRound = gameService.getCurrentRound(game)
            if (
                gameService.checkIfPlayerIsAllowedToPlayCard(
                    currentRound,
                    card,
                    session
                )
            ) {
                const move = { player: session, card }
                currentRound.moves.push(move)
                //finish round
                if (
                    currentRound.moves.length ===
                    game.lobby.group.groupMembers.length
                ) {
                    currentRound.winner = gameService.findWinner(currentRound)
                    //check if this set only had one card left. finish game
                    if (
                        currentRound.cardsPlayers
                            .map((cp) => cp.cards.length)
                            .some((l) => l === 1)
                    ) {
                        //end game
                        const endGame = await gameService.endGame(game)
                        namespace.to(gameId).emit('game:onEndGame', endGame)
                    } else {
                        //new round
                        game.rounds.push(gameService.createRound(game))
                        await gameService.updateGame(game)
                        namespace.to(gameId).emit('game:onNewRound', game)
                    }
                } else {
                    currentRound.nextPlayer = gameService.getNextPlayer(
                        currentRound,
                        game.lobby.group
                    )
                    await gameService.updateGame(game)
                    namespace.to(gameId).emit('game:onPlayedCard', game)
                }
                _callback(true)
                return
            }
        } catch (e) {
            console.error(e)
        }
        _callback(false)
    }

    return { getGame, playCard }
}
