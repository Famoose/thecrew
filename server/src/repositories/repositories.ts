import {
    createSessionRepository,
    SessionRepository,
} from './session.repository'
import { createGroupRepository, GroupRepository } from './group.repository'
import { Db } from 'mongodb'
import {createLobbyRepository, LobbyRepository} from "./lobby.repository";

export type Repositories = {
    sessionRepository: SessionRepository
    groupRepository: GroupRepository
    lobbyRepository: LobbyRepository
}
export const createRepositories = (database: Db): Repositories => {
    const sessionRepository = createSessionRepository(database)
    const groupRepository = createGroupRepository(database)
    const lobbyRepository = createLobbyRepository(database)
    return { sessionRepository, groupRepository, lobbyRepository }
}
