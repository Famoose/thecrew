import {
    Game,
    GameRepository,
    QuestPlayer,
} from '../repositories/game.repository'
import { LobbyService } from './lobby.service'
import { Lobby, LobbyStatus } from '../repositories/lobby.repository'
import { Session } from '../repositories/session.repository'
import { GroupService } from './group.service'
import crypto from 'crypto'
import { Quest } from '../data/quests'

export type GameService = {
    startGame(groupId: string, session: Session): Promise<Game>
    getGame(groupId: string, session: Session): Promise<Game>
}

export const createGameService = (
    gameRepository: GameRepository,
    lobbyService: LobbyService,
    groupService: GroupService
): GameService => {
    const distributeQuestToPlayers = (lobby: Lobby) => {
        if (lobby.mission) {
            const questPlayers: QuestPlayer[] = []
            const playerCount = lobby.group.groupMembers.length
            lobby.mission.quests.forEach((quest: Quest, index) => {
                const player = lobby.group.groupMembers[index % playerCount]
                if (player) {
                    questPlayers.push({
                        player,
                        quest,
                    })
                } else {
                    throw new Error('player not found')
                }
            })
            return questPlayers
        }
        throw new Error('mission was null')
    }
    const startGame = async (groupId: string, session: Session) => {
        const lobby = await lobbyService.findLobbyByGroupId(groupId)
        if (lobby) {
            if (
                groupService.isSessionInGroup(lobby.group, session) &&
                lobby.owner._id === session._id
            ) {
                if (
                    lobby.group.groupMembers.length >=
                        lobby.minRequiredPlayer &&
                    lobby.group.groupMembers.length <= lobby.maxAllowedPlayer &&
                    lobby.status === LobbyStatus.Forming
                ) {
                    if (lobby.mission) {
                        lobby.status = LobbyStatus.InGame

                        const newGame = {
                            _id: crypto.randomUUID(),
                            lobby,
                            questPlayers: distributeQuestToPlayers(lobby),
                        }

                        const scc = await gameRepository.createGame(newGame)
                        if (scc) {
                            await lobbyService.updateLobby(lobby)
                            return newGame
                        }
                        throw new Error('could not save new game to database')
                    }
                    throw new Error('mission was not found')
                }
                throw new Error('lobby not in right condition to start a game')
            }
            throw new Error('player who started is not in the lobby')
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
