import { Game, GameRepository } from '../repositories/game.repository'
import { LobbyService } from './lobby.service'
import { LobbyStatus } from '../repositories/lobby.repository'
import { Session } from '../repositories/session.repository'
import { GroupService } from './group.service'
import crypto from 'crypto'

export type GameService = {
    startGame(groupId: string, session: Session): Promise<Game>
    getGame(groupId: string, session: Session): Promise<Game>
}

export const createGameService = (
    gameRepository: GameRepository,
    lobbyService: LobbyService,
    groupService: GroupService
): GameService => {
    const startGame = async (groupId: string, session: Session) => {
        const lobby = await lobbyService.findLobbyByGroupId(groupId)
        if (lobby) {
            if (groupService.isSessionInGroup(lobby.group, session)) {
                if (
                    lobby.group.groupMembers.length >=
                        lobby.minRequiredPlayer &&
                    lobby.group.groupMembers.length <= lobby.maxAllowedPlayer &&
                    lobby.status === LobbyStatus.Forming
                ) {
                    lobby.status = LobbyStatus.InGame
                    const newGame = {
                        _id: crypto.randomUUID(),
                        lobby,
                    }
                    const scc = await gameRepository.createGame(newGame)
                    if (scc) {
                        await lobbyService.updateLobby(lobby)
                        return newGame
                    }
                    throw new Error('could not save new game to database')
                }
                throw new Error('lobby not in right condition to start a game')
            }
            throw new Error('player how started is not in the lobby')
        }
        throw new Error('lobby not found')
    }

    const getGame = async (gameId: string, session: Session) => {
        const game = await gameRepository.findGame(gameId)
        if (game) {
            if (groupService.isSessionInGroup(game.lobby.group, session)) {
                return game
            }
            throw new Error('player is not in game group')
        }
        throw new Error('game not found')
    }

    return { startGame, getGame }
}
