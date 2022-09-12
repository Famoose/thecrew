import { SessionRepository } from '../repositories/session.repository'
import { Session } from '../repositories/InMemorySessionStorage'

export type SessionService = {
    findSession(id: string): Session | undefined
    saveSession(id: string, session: Session): void
    findAllSessions(): Session[]
    checkValidSession(sessionID: string | undefined): Session
}

export const createSessionService = (
    sessionRepository: SessionRepository
): SessionService => {
    const findSession = sessionRepository.findSession
    const saveSession = sessionRepository.saveSession
    const findAllSessions = sessionRepository.findAllSessions

    const checkValidSession = (sessionID: string | undefined) => {
        const foundSession = findSession(sessionID || '')
        if (!foundSession) {
            throw new Error(`no session found for ID: ${sessionID}`)
        }
        return foundSession
    }

    return { findSession, saveSession, findAllSessions, checkValidSession }
}
