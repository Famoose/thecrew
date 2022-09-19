import {
    createSessionRepository,
    SessionRepository,
} from './session.repository'
import { createGroupRepository, GroupRepository } from './group.repository'
import { Db } from 'mongodb'

export type Repositories = {
    sessionRepository: SessionRepository
    groupRepository: GroupRepository
}
export const createRepositories = (database: Db): Repositories => {
    const sessionRepository = createSessionRepository(database)
    const groupRepository = createGroupRepository(database)
    return { sessionRepository, groupRepository }
}
