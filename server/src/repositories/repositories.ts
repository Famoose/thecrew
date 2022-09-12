import {
    createSessionRepository,
    SessionRepository,
} from './session.repository'
import { createGroupRepository, GroupRepository } from './group.repository'

export type Repositories = {
    sessionRepository: SessionRepository
    groupRepository: GroupRepository
}
export const createRepositories = (): Repositories => {
    const sessionRepository = createSessionRepository()
    const groupRepository = createGroupRepository()
    return { sessionRepository, groupRepository }
}
