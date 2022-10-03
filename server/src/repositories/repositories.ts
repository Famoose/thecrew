import {
    createSessionRepository,
    SessionRepository,
} from './session.repository'
import { createGroupRepository, GroupRepository } from './group.repository'
import { Db } from 'mongodb'
import { createLobbyRepository, LobbyRepository } from './lobby.repository'
import { createGameRepository, GameRepository } from './game.repository'

export type Repositories = {
    sessionRepository: SessionRepository
    groupRepository: GroupRepository
    lobbyRepository: LobbyRepository
    gameRepository: GameRepository
}
export const createRepositories = (database: Db): Repositories => {
    const sessionRepository = createSessionRepository(database)
    const groupRepository = createGroupRepository(database)
    const lobbyRepository = createLobbyRepository(database)
    const gameRepository = createGameRepository(database)
    return {
        sessionRepository,
        groupRepository,
        lobbyRepository,
        gameRepository,
    }
}
