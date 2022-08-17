import {
    createSessionRepository,
    SessionRepository,
} from './session.repository'

export type Repositories = {
    sessionRepository: SessionRepository
}
export const createRepositories = (): Repositories => {
    const sessionRepository = createSessionRepository()
    return { sessionRepository }
}
