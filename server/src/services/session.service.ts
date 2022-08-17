import { SessionRepository } from '../repositories/session.repository'
import { Session } from '../repositories/InMemorySessionStorage'

export type SessionService = {
    findSession(id: string): Session | undefined
    saveSession(id: string, session: Session): void
    findAllSessions(): Session[]
}

export const createSessionService = (
    sessionRepository: SessionRepository
): SessionService => {
    const findSession = sessionRepository.findSession
    const saveSession = sessionRepository.saveSession
    const findAllSessions = sessionRepository.findAllSessions
    return { findSession, saveSession, findAllSessions }
}
